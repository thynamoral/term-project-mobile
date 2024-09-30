import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import useBlogPosts from "../hooks/useBlogPost";
import { formatDate } from "../utils/formateDate";
import { bookmark, heart } from "ionicons/icons";
import BlogPostCard from "../components/BlogPostCard";

const Home = () => {
  const { blogPosts, loading } = useBlogPosts();
  const router = useIonRouter();

  if (loading) return <p>Loading...</p>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {blogPosts?.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
