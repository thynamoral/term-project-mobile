import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const NewPost = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>NewPost</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">UI goes here...</IonContent>
    </IonPage>
  );
};

export default NewPost;
