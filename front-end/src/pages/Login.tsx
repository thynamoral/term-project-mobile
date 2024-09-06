import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { logInOutline } from "ionicons/icons";
import TechHub from "../assets/TechHub_Logo.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import apiClient from "../services/apiClient";
import { setAuthToken } from "../preferences/auth";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useIonRouter();

  // handle change username
  const handleUsername = (event: CustomEvent) => {
    setUsername((event as CustomEvent).detail.value);
  };

  // handle change password
  const handlePassword = (event: CustomEvent) => {
    setPassword((event as CustomEvent).detail.value);
  };

  // handle login
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login");

    try {
      const res = await apiClient.post("/api/login", {
        username,
        password,
      });
      if (res.status === 200) {
        console.log(res.data);
        setAuthToken(res.data.accessToken);
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div
          className="logo"
          style={{ textAlign: "center", margin: "20px 0px" }}
        >
          <img
            src={TechHub}
            alt="logo"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          style={{ fontSize: "32px", fontWeight: "bold", textAlign: "center" }}
        >
          <IonText color="primary">Login to your</IonText> <br />
          <IonText color="primary">Account</IonText>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#73849a",
              margin: "25px 0px",
            }}
          >
            Enter your username and password to login
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <IonList>
            <IonItem>
              <IonInput
                type="text"
                label="Username"
                labelPlacement="floating"
                placeholder="Enter your username"
                className="ion-margin-top"
                value={username}
                onIonInput={handleUsername}
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="password"
                label="Password"
                labelPlacement="floating"
                placeholder="Enter your password"
                className="ion-margin-top"
                value={password}
                onIonInput={handlePassword}
              />
            </IonItem>
          </IonList>
          <IonButton
            expand="block"
            type="submit"
            className="ion-padding-vertical"
          >
            Login
            <IonIcon icon={logInOutline} slot="end" />
          </IonButton>
        </form>
        <div>
          <p style={{ textAlign: "center" }}>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
