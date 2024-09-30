import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonIcon,
  IonPage,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { bookmark, chevronBack, heart } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useBlogPosts, { BlogPost } from "../hooks/useBlogPost";
import useUserInteractions from "../hooks/useUserInteractions";

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentBlogPost, setCurrentBlogPost] = useState<
    BlogPost | null | undefined
  >(null);
  const {
    likedBlogPosts,
    bookmarkedBlogPosts,
    totalLikes,
    likeBlogPost,
    unlikeBlogPost,
  } = useUserInteractions(id!);
  const router = useIonRouter();
  const { fetchBlogPostById, loading, error } = useBlogPosts();

  const getCurrentBlogPost = async () => {
    try {
      const post = await fetchBlogPostById(id!);
      return post;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getCurrentBlogPost();
        setCurrentBlogPost(post);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const handleBack = () => {
    router.goBack(); // Custom back button using router
  };

  const handleLike = async () => {
    await likeBlogPost(id!);
  };

  const handleUnlike = async () => {
    await unlikeBlogPost(id!);
  };

  const handleBookmark = async () => {
    await handleBookmark();
  };

  const handleUnbookmark = async () => {
    await handleUnbookmark();
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <IonText color="medium">Loading...</IonText>
        </IonContent>
      </IonPage>
    );
  }

  if (error || !currentBlogPost) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <IonText color="danger">Error fetching blog post</IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonToolbar>
          <IonButtons>
            <IonButton onClick={handleBack}>
              <IonIcon slot="start" icon={chevronBack}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <h2 style={{ fontSize: "28px", fontWeight: "600", margin: 0 }}>
          {currentBlogPost.title}
        </h2>
        <IonText color="primary" style={{ fontWeight: 500 }}>
          @{currentBlogPost.author.username}
        </IonText>
        <img
          src={currentBlogPost.image}
          alt="Blog post image"
          style={{ marginTop: "10px" }}
        />
        <p style={{ whiteSpace: "pre-wrap" }}>{currentBlogPost.content}</p>
      </IonContent>
      <IonChip
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          padding: 0,
        }}
      >
        <IonButton
          fill="clear"
          onClick={likedBlogPosts ? handleUnlike : handleLike}
        >
          <IonIcon icon={heart} color={likedBlogPosts ? "danger" : "medium"} />
          <IonText>{totalLikes}</IonText>
        </IonButton>
        <IonButton fill="clear" onClick={handleBookmark}>
          <IonIcon
            icon={bookmark}
            color={bookmarkedBlogPosts ? "primary" : "medium"}
          />
        </IonButton>
      </IonChip>
    </IonPage>
  );
};

export default BlogPostPage;
