import {
  IonAvatar,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
} from "@ionic/react";
// hook
import useAuthStore from "../hooks/useAuthStore";

const Profile = () => {
  const { auth } = useAuthStore();
  console.log(auth?.userId);
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonItem lines="none">
          <IonAvatar slot="start" style={{ width: "60px", height: "60px" }}>
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
          <div>
            <IonLabel style={{ fontSize: "24px", fontWeight: "700" }}>
              {/* {user?.username} */}
              Test
            </IonLabel>
            <IonText color="medium">0 Blogs</IonText>
          </div>
        </IonItem>
        <IonButton shape="round" color="light">
          Edit Profile
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
