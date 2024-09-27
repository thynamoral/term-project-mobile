import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonChip,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import useSearchBlog from "../hooks/useSearchBlog";
import useTopic from "../hooks/useTopic";

const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [initLoad, setInitLoad] = useState(true);
  const { topics } = useTopic();
  const {
    blogPosts,
    loading: searchLoading,
    updateSearchTerm,
  } = useSearchBlog();
  const router = useIonRouter();

  const handleSearchByTopic = async (topic: any) => {
    setSelectedTopic(topic._id);
    updateSearchTerm(topic.name.toLowerCase());
  };

  useEffect(() => {
    if (searchInput !== "") {
      setSearchTerm(searchInput);
    } else {
      // If search input is cleared, reset the search term
      updateSearchTerm("");
      setSelectedTopic(null);
    }
  }, [searchInput]);

  useEffect(() => {
    // Update search term and reset selected topic when the search term changes
    if (searchTerm) {
      updateSearchTerm(searchTerm);
    } else {
      updateSearchTerm("");
      setSelectedTopic(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (initLoad && blogPosts.length > 0) {
      setInitLoad(false); // Set initLoad to false after first data load
    }
  }, [blogPosts]);

  useEffect(() => {
    if (selectedTopic) {
      setSearchInput(
        topics.find((topic) => topic._id === selectedTopic)?.name!
      );
    }
  }, [selectedTopic]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText
          style={{
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Explore
        </IonText>
        <IonInput
          placeholder="Search..."
          value={searchInput}
          onIonInput={(e: any) => setSearchInput(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            width: "100%",
            border: "1px solid #ccc",
            maxWidth: "400px",
            fontSize: "16px",
            marginTop: "5px",
            marginBottom: "5px",
          }}
          clearInput
        >
          <IonIcon
            slot="start"
            icon={searchOutline}
            style={{ paddingLeft: "8px" }}
          />
        </IonInput>

        {/* Horizontally Scrollable Topic Chips */}
        <div style={{ overflow: "auto", whiteSpace: "nowrap" }}>
          {topics.map((topic, index) => (
            <IonChip
              key={index}
              style={{ marginRight: "8px" }}
              onClick={() => handleSearchByTopic(topic)}
              color={selectedTopic === topic._id ? "primary" : "medium"}
            >
              <IonLabel>{topic.name}</IonLabel>
            </IonChip>
          ))}
        </div>

        {searchLoading ? (
          <IonText color="medium">Loading...</IonText>
        ) : (
          <IonList>
            {blogPosts.length === 0 && !initLoad ? (
              <IonItem lines="none">
                <IonText color="medium">No results found</IonText>
              </IonItem>
            ) : (
              blogPosts.map((post) => (
                <IonCard
                  key={post._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push(`/blogPost/${post._id}`)}
                >
                  <IonCardHeader>
                    <IonLabel
                      style={{
                        fontSize: "20px",
                        color: "#000",
                        fontWeight: "600",
                      }}
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
                  <IonCardContent>
                    {post.content.substring(0, 100)}
                  </IonCardContent>
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
              ))
            )}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Search;
