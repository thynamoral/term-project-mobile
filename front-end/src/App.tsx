import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
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
        setLoading(false); // Set loading to false when done
      }
    };
    checkAuth();
  }, [setIsAuthenticated]);

  console.log(isAuthenticated);

  // if (loading) {
  //   // Optionally render a loading spinner or component
  //   return <IonLoading isOpen={true} message="Loading..." />;
  // }
  if (loading) return <div>Loading...</div>;

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route path="/register" component={Register} />
            {/* Redirect if not authenticated */}
            <Route exact path="/">
              {isAuthenticated ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
