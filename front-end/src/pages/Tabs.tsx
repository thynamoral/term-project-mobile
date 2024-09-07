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
import Profile from "./Profile";
import Settings from "./Settings";
import { homeOutline, personOutline, settingsOutline } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";

const Tabs = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tabs/home" component={Home} />
          <Route exact path="/tabs/profile" component={Profile} />
          <Route exact path="/tabs/settings" component={Settings} />
          <Redirect exact path="/tabs" to="/tabs/home" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/tabs/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/tabs/profile">
            <IonIcon icon={personOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/tabs/settings">
            <IonIcon icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Tabs;
