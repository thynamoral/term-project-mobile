import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useBookmarkedBlogPost from "../hooks/useBookmarkedBlogPost";
import BlogPostCard from "../components/BlogPostCard";

const Bookmark = () => {
  const { bookmarkedBlogPosts, isLoading } = useBookmarkedBlogPost();

  if (isLoading) return <p>Loading...</p>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bookmark</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {bookmarkedBlogPosts?.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IonText
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              No bookmarks yet!
            </IonText>
            <IonText style={{ fontSize: "14px" }}>
              Bookmark someone else's blog post and it will appear here.
            </IonText>
          </div>
        ) : (
          <IonList>
            {bookmarkedBlogPosts?.map((post) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Bookmark;
