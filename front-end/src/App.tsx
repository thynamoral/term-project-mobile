import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonText,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

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
import { getAuthToken } from "./preferences/auth";
import useAuth from "./hooks/useAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tabs from "./pages/Tabs";

setupIonicReact();

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authToken = await getAuthToken();
        console.log("Auth Token:", authToken); // Debugging line
        setIsAuthenticated(!!authToken.value);
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
