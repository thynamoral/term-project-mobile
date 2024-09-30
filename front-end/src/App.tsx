import {
  IonApp,
  IonRouterOutlet,
  IonText,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */

/* Theme variables */
import "./theme/variables.css";
// import { getAuth } from "./preferences/auth";
import useAuth from "./hooks/useAuth";
import useAuthStore from "./hooks/useAuthStore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Setting from "./pages/Setting";
import Tabs from "./pages/Tabs";

setupIonicReact();

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { auth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsAuthenticated(!!auth);
      } catch (error) {
        console.error("Error fetching auth token:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [isAuthenticated]);

  if (loading)
    return (
      <IonApp>
        <IonText>Loading</IonText>
      </IonApp>
    );

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/setting" component={Setting} />
          <Route path="/tabs" component={Tabs} />
          <Route
            exact
            path="/"
            render={() =>
              isAuthenticated ? (
                <Redirect to="/tabs" />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          {isAuthenticated ? <Redirect to="/tabs" /> : <Redirect to="/login" />}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
