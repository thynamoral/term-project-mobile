import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
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
            <IonCard
              key={post._id}
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/tabs/blogPost/${post._id}`)}
            >
              <IonCardHeader>
                <IonLabel
                  style={{ fontSize: "20px", color: "#000", fontWeight: "600" }}
                >
                  {post.title}
                </IonLabel>
                <IonText
                  color="primary"
                  style={{ fontWeight: 500, marginBottom: "5px" }}
                >
                  @{post.author.username}
                </IonText>
                <img
                  src={post.image}
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </IonCardHeader>
              <IonCardContent>{post.content.substring(0, 100)}</IonCardContent>
              {post.topic && post.topic.length > 0 ? (
                <IonItem lines="none">
                  {post.topic?.map((topic) => (
                    <IonBadge key={topic._id} color="primary">
                      {topic.name}
                    </IonBadge>
                  ))}
                </IonItem>
              ) : null}
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
