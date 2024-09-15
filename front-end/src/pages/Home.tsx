import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useAuthStore from "../hooks/useAuthStore";

const Home = () => {
  const { auth } = useAuthStore();
  console.log(auth?.userId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{auth?.userId}</IonContent>
    </IonPage>
  );
};

export default Home;
