import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import useAuthStore from "../hooks/useAuthStore";
import useTopic from "../hooks/useTopic";
import useUserProfileBlogs from "../hooks/useUserProfileBlogs";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("toast-success"); // Default to success color
  const router = useIonRouter();
  // State for selected topic and new topic
  const [selectedTopic, setSelectedTopic] = useState<string | null | undefined>(
    null
  );
  const [newTopic, setNewTopic] = useState<string>("");
  const [addNewTopic, setAddNewTopic] = useState<boolean>(false); // Toggle for new topic
  // hooks
  const { auth } = useAuthStore();
  const { topics, addTopic } = useTopic();
  const { createBlogPost } = useUserProfileBlogs();

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

  const handleUpload = async () => {
    if (!image || !title || !content) {
      setToastMessage("Please complete all fields including a valid image.");
      setToastColor("toast-error");
      setShowToast(true);
      return;
    }

    // Create a new topic if provided
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

    // Create a new blog post
    const formData = new FormData();
    formData.append("authorId", auth?.userId!);
    formData.append("title", title);
    formData.append("content", content);
    if (topicId) {
      formData.append("topicIds", topicId);
    }
    formData.append("image", image);

    try {
      await createBlogPost(formData);
      setTitle("");
      setContent("");
      setImage(null);
      setPreview(null);
      setSelectedTopic(null);
      setNewTopic("");
      setAddNewTopic(false);
      setToastMessage("Blog post created successfully.");
      setToastColor("toast-success");
    } catch (err) {
      setToastMessage("Failed to create blog post.");
      setToastColor("toast-error");
    }
    setShowToast(true);
    router.push("/tabs/profile", "root", "push");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Post</IonTitle>
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
            rows={14}
          ></IonTextarea>
        </IonItem>
        {/* // Toggle between select topic or add new topic */}
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
        {/* // Conditionally render topic selection or new topic input */}
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
        {/* Upload Button */}
        <IonButton
          expand="block"
          style={{ marginTop: "2rem" }}
          onClick={handleUpload}
        >
          Upload Post
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

export default NewPost;
