import {
  IonActionSheet,
  IonAvatar,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonToast,
  useIonRouter,
} from "@ionic/react";
import {
  bookmark,
  ellipsisHorizontal,
  eye,
  heart,
  settingsOutline,
  text,
} from "ionicons/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import useBlogPosts from "../hooks/useBlogPost";
import useUser from "../hooks/useUser";
import { formatDate } from "../utils/formateDate";

const Profile = () => {
  const [actionSheetState, setActionSheetState] = useState<{
    isOpen: boolean;
    postId?: string;
  }>({ isOpen: false });
  const router = useIonRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastColor, setToastColor] = useState("toast-success"); // Default to success color
  const [toastMessage, setToastMessage] = useState("");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const { user, loading: userLoading } = useUser();
  const {
    blogPostUser: blogPosts,
    loading: postsLoading,
    deleteBlogPost,
    updateReadCount,
  } = useBlogPosts();

  const handleEdit = () => {
    if (selectedPost) {
      router.push(`/tabs/editPost/${selectedPost}`);
    }
    setActionSheetState({ isOpen: false });
  };

  const handleDelete = async () => {
    try {
      await deleteBlogPost(selectedPost!, user?._id!);
      setActionSheetState({ isOpen: false });
      setToastColor("toast-error");
      setToastMessage("Post deleted successfully.");
      setShowToast(true);
    } catch (error) {
      setToastMessage("Failed to delete post.");
      setShowToast(true);
      return;
    }
  };

  const openActionSheet = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the card click event
    setSelectedPost(postId);
    setActionSheetState({ isOpen: true });
  };

  if (userLoading || postsLoading) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <IonText color="medium">Loading...</IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonItem lines="none">
          <IonAvatar slot="start" style={{ width: "60px", height: "60px" }}>
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
          <div>
            <IonLabel style={{ fontSize: "24px", fontWeight: "700" }}>
              {user?.username}
            </IonLabel>
            <IonText color="medium">{blogPosts?.length} Blogs</IonText>
          </div>
          <Link to="/setting">
            <IonFab slot="end" vertical="bottom" horizontal="end">
              <IonFabButton color="light">
                <IonIcon icon={settingsOutline} />
              </IonFabButton>
            </IonFab>
          </Link>
        </IonItem>
        <IonButton shape="round" color="light">
          Edit Profile
        </IonButton>
        {/* Render blog posts */}
        <IonList>
          {blogPosts?.map((post) => (
            <IonCard
              key={post._id}
              style={{ cursor: "pointer" }}
              onClick={async () => {
                await updateReadCount(post._id!);
                router.push(`/tabs/blogPost/${post._id}`);
              }}
            >
              <IonButton
                fill="clear"
                style={{
                  position: "absolute",
                  top: "3px",
                  right: "3px",
                  zIndex: 1,
                }}
                onClick={(e) => openActionSheet(post._id!, e)}
              >
                <IonIcon slot="start" color="dark" icon={ellipsisHorizontal} />
              </IonButton>
              <IonCardHeader>
                <IonLabel
                  style={{
                    fontSize: "20px",
                    color: "#000",
                    fontWeight: "600",
                    maxWidth: "90%",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {post.title}
                </IonLabel>
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
              {/* Date, likes, and bookmarks */}
              <IonItem lines="none" style={{ display: "flex", height: "30px" }}>
                <IonText
                  color="medium"
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginRight: "20px",
                  }}
                >
                  {formatDate(post.createdAt!)}
                </IonText>
                {post.likes?.length > 0 ? (
                  <IonText
                    color="medium"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      fontSize: "14px",
                      fontWeight: 600,
                      marginRight: "20px",
                    }}
                  >
                    <IonIcon icon={heart} color="medium" />
                    <span>{post.likes?.length}</span>
                  </IonText>
                ) : null}
                {post.bookmarks?.length > 0 ? (
                  <IonText
                    color="medium"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      fontSize: "14px",
                      fontWeight: 600,
                      marginRight: "20px",
                    }}
                  >
                    <IonIcon icon={bookmark} color="medium" />
                    <span>{post.bookmarks?.length}</span>
                  </IonText>
                ) : null}
                {/* Read count */}
                {post.readCount > 0 ? (
                  <IonText
                    color="medium"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      fontSize: "14px",
                      fontWeight: 600,
                      marginRight: "20px",
                    }}
                  >
                    <IonIcon icon={eye} color="medium" />
                    <span>{post.readCount}</span>
                  </IonText>
                ) : null}
              </IonItem>
            </IonCard>
          ))}
        </IonList>

        {/* Action Sheet for Edit/Delete */}
        <IonActionSheet
          isOpen={actionSheetState.isOpen}
          onDidDismiss={() => setActionSheetState({ isOpen: false })}
          buttons={[
            {
              text: "Edit",
              handler: handleEdit,
            },
            {
              text: "Delete",
              role: "destructive",
              handler: handleDelete,
            },
            {
              text: "Cancel",
              role: "cancel",
            },
          ]}
        />

        {/* Toast for feedback */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="top"
          cssClass={toastColor}
        />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
