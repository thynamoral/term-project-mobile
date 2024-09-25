import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { chevronBack } from "ionicons/icons";
import useBlogPosts, { BlogPost } from "../hooks/useBlogPost";

const BlogPostPage = () => {
  const [currentBlogPost, setCurrentBlogPost] = useState<
    BlogPost | null | undefined
  >(null);
  const { id } = useParams<{ id: string }>();
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
        <p>{currentBlogPost.content}</p>
      </IonContent>
    </IonPage>
  );
};

export default BlogPostPage;
