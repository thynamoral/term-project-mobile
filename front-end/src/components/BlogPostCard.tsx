import {
  IonCard,
  IonCardHeader,
  IonLabel,
  IonText,
  IonCardContent,
  IonItem,
  IonBadge,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import { formatDate } from "../utils/formateDate";
import { heart, bookmark, eye } from "ionicons/icons";
import useBlogPosts, { BlogPost } from "../hooks/useBlogPost";

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  const { updateReadCount } = useBlogPosts();
  const router = useIonRouter();
  return (
    <IonCard
      key={post._id}
      style={{ cursor: "pointer" }}
      onClick={async () => {
        await updateReadCount(post._id!);
        router.push(`/tabs/blogPost/${post._id}`);
      }}
    >
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
        <IonText
          color="primary"
          style={{ fontWeight: 500, marginBottom: "5px" }}
        >
          @{post.author?.username}
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
      {/* Tags of the blog post */}
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
  );
};

export default BlogPostCard;
