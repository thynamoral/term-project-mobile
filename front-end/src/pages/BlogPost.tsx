import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonIcon,
  IonItem,
  IonPage,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  bookmark,
  bookmarkOutline,
  chevronBack,
  eye,
  heart,
  heartOutline,
} from "ionicons/icons";
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
    totalBookmarks,
    likeBlogPost,
    unlikeBlogPost,
    bookmarkBlogPost,
    unbookmarkBlogPost,
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
    await bookmarkBlogPost(id!);
  };

  const handleUnbookmark = async () => {
    await unbookmarkBlogPost(id!);
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
        <IonItem style={{ "--padding-start": "0" }}>
          <IonButton
            fill="clear"
            onClick={likedBlogPosts ? handleUnlike : handleLike}
          >
            <IonIcon
              icon={likedBlogPosts ? heart : heartOutline}
              color="medium"
            />
            <IonText color="medium" style={{ marginLeft: "5px" }}>
              {totalLikes}
            </IonText>
          </IonButton>
          <IonButton
            fill="clear"
            onClick={bookmarkedBlogPosts ? handleUnbookmark : handleBookmark}
          >
            <IonIcon
              icon={bookmarkedBlogPosts ? bookmark : bookmarkOutline}
              color={"medium"}
            />
            <IonText color="medium" style={{ marginLeft: "5px" }}>
              {totalBookmarks}
            </IonText>
          </IonButton>
          {/* Read count */}
          <div
            style={{ height: "25px", display: "flex", alignItems: "center" }}
          >
            <IonIcon icon={eye} color="medium" />
            <IonText
              color="medium"
              style={{ marginLeft: "7px", cursor: "default", fontSize: "12px" }}
            >
              {currentBlogPost.readCount}
            </IonText>
          </div>
        </IonItem>
        <p style={{ whiteSpace: "pre-wrap" }}>{currentBlogPost.content}</p>
      </IonContent>
    </IonPage>
  );
};

export default BlogPostPage;
