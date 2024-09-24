import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonImg,
  IonToast,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonIcon,
  useIonRouter,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBlogPosts from "../hooks/useBlogPost";
import useTopic from "../hooks/useTopic";
import { chevronBack } from "ionicons/icons";
import useUser from "../hooks/useUser";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("toast-success"); // Default to success color
  const [selectedTopic, setSelectedTopic] = useState<string | null | undefined>(
    null
  );
  const [newTopic, setNewTopic] = useState<string>("");
  const [addNewTopic, setAddNewTopic] = useState<boolean>(false);
  const { loading, updateBlogPost, fetchBlogPostById } = useBlogPosts();
  const { topics, addTopic } = useTopic();
  const router = useIonRouter();

  // Fetch the blog post details by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await fetchBlogPostById(id); // Fetch post by ID
        setTitle(post.title);
        setContent(post.content);
        setPreview(post.image); // Assuming image URL
        setSelectedTopic(post.topic[0]._id); // Assuming multiple topics
      } catch (error) {
        setToastMessage("Failed to fetch blog post.");
        setToastColor("toast-error");
        setShowToast(true);
      }
    };
    fetchPost();
  }, []);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (file && validImageTypes.includes(file.type)) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      e.target.value = ""; // clear input
      setToastMessage("Only JPG, JPEG, or PNG formats are allowed.");
      setShowToast(true);
    }
  };

  const handleUpdate = async () => {
    if (!title || !content) {
      setToastMessage("Please complete all fields.");
      setToastColor("toast-error");
      setShowToast(true);
      return;
    }

    let topicId = selectedTopic;
    if (newTopic) {
      try {
        const newTopicResponse = await addTopic(newTopic);
        topicId = newTopicResponse?._id; // Use the _id from the returned topic
      } catch (error) {
        setToastMessage("Failed to add new topic.");
        setShowToast(true);
        return;
      }
    }

    // Create form data for update
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (topicId) {
      formData.append("topicIds", topicId);
    }
    if (image) {
      formData.append("image", image); // Add new image if uploaded
    }

    try {
      await updateBlogPost(id, formData);
      setToastMessage("Blog post updated successfully.");
      setToastColor("toast-success");
    } catch (err) {
      setToastMessage("Failed to update blog post.");
      setToastColor("toast-error");
    }
    setShowToast(true);
    router.push("/tabs/profile", "back", "push");
  };

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBack}>
              <IonIcon slot="start" icon={chevronBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Image Upload */}
        <IonItem>
          <IonLabel>Post Image</IonLabel>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginLeft: "1rem" }}
          />
        </IonItem>
        {/* Preview Image */}
        {preview && <IonImg src={preview} style={{ marginTop: "1rem" }} />}
        {/* Post Title Input */}
        <IonItem>
          <IonInput
            label="Post Title"
            labelPlacement="stacked"
            placeholder="Enter your post title"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
            clearInput
          ></IonInput>
        </IonItem>
        {/* Post Content Input */}
        <IonItem>
          <IonTextarea
            label="Post Content"
            labelPlacement="stacked"
            placeholder="Enter your post content"
            value={content}
            onIonChange={(e) => setContent(e.detail.value!)}
            rows={6}
          ></IonTextarea>
        </IonItem>
        {/* Toggle between select topic or add new topic */}
        <IonItem lines="none">
          <IonLabel>Want to add a new topic?</IonLabel>
          <IonButton
            onClick={() => {
              setAddNewTopic(!addNewTopic);
              setSelectedTopic(null); // Reset selected topic when switching
              setNewTopic(""); // Reset new topic when switching
            }}
          >
            {addNewTopic ? "Cancel New Topic" : "Add New Topic"}
          </IonButton>
        </IonItem>
        {/* Conditionally render topic selection or new topic input */}
        {addNewTopic ? (
          // Input to add a new topic
          <IonItem>
            <IonInput
              label="New Topic"
              labelPlacement="stacked"
              placeholder="Add a new topic"
              value={newTopic}
              onIonChange={(e) => setNewTopic(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
        ) : (
          // Dropdown to select an existing topic
          <IonItem>
            <IonLabel>Select Topic</IonLabel>
            <IonSelect
              placeholder="Select a topic"
              value={selectedTopic}
              onIonChange={(e) => setSelectedTopic(e.detail.value)}
            >
              {topics.map((topic) => (
                <IonSelectOption key={topic._id} value={topic._id}>
                  {topic.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        )}
        {/* Update Button */}
        <IonButton
          expand="block"
          style={{ marginTop: "2rem" }}
          onClick={handleUpdate}
        >
          Update Post
        </IonButton>
        {/* Toast Notification for Errors */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          cssClass={toastColor}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default EditPost;
