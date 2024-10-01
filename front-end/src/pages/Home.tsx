import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import BlogPostCard from "../components/BlogPostCard";
import useBlogPosts from "../hooks/useBlogPost";

const Home = () => {
  const { blogPosts, loading } = useBlogPosts();

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
