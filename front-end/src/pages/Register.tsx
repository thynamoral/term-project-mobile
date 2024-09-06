import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
} from "@ionic/react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonButtons>
          <IonBackButton defaultHref="/login"></IonBackButton>
        </IonButtons>
        <div
          style={{ fontSize: "32px", fontWeight: "bold", textAlign: "center" }}
        >
          <IonText color="primary">Sign Up</IonText>
        </div>
        <p
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#73849a",
            margin: "25px 0px",
            textAlign: "center",
          }}
        >
          Create an account to get started with us!
        </p>
        <form>
          <IonList>
            <IonItem>
              <IonInput
                type="text"
                label="Username"
                labelPlacement="floating"
                placeholder="Enter your username"
                className="ion-margin-top"
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="email"
                label="Email"
                labelPlacement="floating"
                placeholder="Enter your email"
                className="ion-margin-top"
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="password"
                label="Password"
                labelPlacement="floating"
                placeholder="Enter your password"
                className="ion-margin-top"
              />
            </IonItem>
          </IonList>
          <IonButton
            expand="block"
            type="submit"
            className="ion-padding-vertical"
          >
            Sign Up
          </IonButton>
        </form>
        <div>
          <p style={{ textAlign: "center" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
