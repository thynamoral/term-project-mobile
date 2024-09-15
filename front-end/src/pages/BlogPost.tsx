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
import { useEffect } from "react";
import { useParams } from "react-router";
import { chevronBack } from "ionicons/icons";
import useBlogPosts from "../hooks/useBlogPost";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const router = useIonRouter();
  const { fetchBlogPostById, currentBlogPost, loading, error } = useBlogPosts();

  useEffect(() => {
    if (id) {
      fetchBlogPostById(id); // Fetch the blog post when ID is available
    }
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
        <h2 style={{ fontSize: "34px", fontWeight: "600" }}>
          {currentBlogPost.title}
        </h2>
        <p>{currentBlogPost.content}</p>
      </IonContent>
    </IonPage>
  );
};

export default BlogPost;
