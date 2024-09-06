import { IonButton, IonContent, IonInput, IonPage } from "@ionic/react";

const Login = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="logo" style={{ marginTop: "100px" }}>
          <img src="/favicon.ico" alt="logo" />
        </div>
        <form>
          <IonInput
            type="text"
            fill="solid"
            label="Username"
            labelPlacement="floating"
            placeholder="Enter your username"
            className="ion-margin-top"
          />
          <IonInput
            type="password"
            fill="solid"
            label="Password"
            labelPlacement="floating"
            placeholder="Enter your password"
            className="ion-margin-top"
          />
          <IonButton expand="block" type="submit" className="ion-margin-top">
            Login
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
