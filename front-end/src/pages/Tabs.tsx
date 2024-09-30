import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import {
  addCircleOutline,
  bookmarkOutline,
  homeOutline,
  personCircleOutline,
  searchOutline,
} from "ionicons/icons";
import { Redirect, Route, useLocation } from "react-router-dom";
import BlogPostPage from "./BlogPost";
import Bookmark from "./Bookmark";
import EditPost from "./EditPost";
import Home from "./Home";
import NewPost from "./NewPost";
import Profile from "./Profile";
import Search from "./Search";
import useSelectedTabs from "../hooks/useSelectedTabs";
import { useEffect } from "react";

const Tabs = () => {
  const location = useLocation();
  const { selectedTabs, setSelectedTabs } = useSelectedTabs();

  useEffect(() => {
    if (
      location.pathname.startsWith("/tabs/blogPost") ||
      location.pathname.startsWith("/tabs/editPost")
    ) {
      setSelectedTabs(selectedTabs);
    } else {
      setSelectedTabs(location.pathname);
    }
  }, [location.pathname]);

  console.log(selectedTabs);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home" component={Home} />
        <Route exact path="/tabs/search" component={Search} />
        <Route exact path="/tabs/new-post" component={NewPost} />
        <Route exact path="/tabs/bookmark" component={Bookmark} />
        <Route exact path="/tabs/profile" component={Profile} />
        <Route exact path="/tabs/blogPost/:id" component={BlogPostPage} />
        <Route exact path="/tabs/editPost/:id" component={EditPost} />
        <Route exact path="/tabs" render={() => <Redirect to="/tabs/home" />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton
          tab="home"
          href="/tabs/home"
          selected={selectedTabs === "/tabs/home"}
        >
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton
          tab="search"
          href="/tabs/search"
          selected={selectedTabs === "/tabs/search"}
        >
          <IonIcon icon={searchOutline} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>
        <IonTabButton tab="new-post" href="/tabs/new-post">
          <IonIcon icon={addCircleOutline} size="large" />
        </IonTabButton>
        <IonTabButton
          tab="bookmark"
          href="/tabs/bookmark"
          selected={selectedTabs === "/tabs/bookmark"}
        >
          <IonIcon icon={bookmarkOutline} />
          <IonLabel>Bookmark</IonLabel>
        </IonTabButton>
        <IonTabButton
          tab="profile"
          href="/tabs/profile"
          selected={selectedTabs === "/tabs/profile"}
        >
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
