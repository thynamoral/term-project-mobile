import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching auth token:", error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkAuth();
  }, [setIsAuthenticated]);

  if (loading) return;

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            {/* authentication routes */}
            {isAuthenticated ? (
              <>
                <Route exact path="/tabs" component={Tabs} />
                <Redirect exact from="/tabs/home" to="/tabs" />
              </>
            ) : (
              <>
                <Route exact path="/login" render={() => <Login />} />
                <Route path="/register" render={() => <Register />} />
                <Redirect exact from="/" to="/login" />
              </>
            )}
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
