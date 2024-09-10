import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonRouterOutlet,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import Bookmark from "./Bookmark";
import {
  addCircleOutline,
  homeOutline,
  personCircleOutline,
  searchOutline,
  bookmarkOutline,
} from "ionicons/icons";
import NewPost from "./NewPost";

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home" component={Home} />
        <Route exact path="/tabs/search" component={Search} />
        <Route exact path="/tabs/new-post" component={NewPost} />
        <Route exact path="/tabs/bookmark" component={Bookmark} />
        <Route exact path="/tabs/profile" component={Profile} />
        <Route exact path="/tabs" render={() => <Redirect to="/tabs/home" />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="search" href="/tabs/search">
          <IonIcon icon={searchOutline} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>
        <IonTabButton tab="new-post" href="/tabs/new-post">
          <IonIcon icon={addCircleOutline} size="large" />
        </IonTabButton>
        <IonTabButton tab="bookmark" href="/tabs/bookmark">
          <IonIcon icon={bookmarkOutline} />
          <IonLabel>Bookmark</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
