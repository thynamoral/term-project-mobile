import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonItem,
  IonList,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import useAuthStore from "../hooks/useAuthStore";

const Setting = () => {
  const { removeAuth } = useAuthStore();
  const router = useIonRouter();
  const settings = [
    { path: "/profile", name: "Profile" },
    { path: "/home", name: "Home" },
    { path: "/search", name: "Search Blog" },
    { path: "/bookmark", name: "Bookmark" },
  ];

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonButtons>
          <IonBackButton defaultHref="/profile"></IonBackButton>
        </IonButtons>
        <IonList>
          {settings.map((setting) => (
            <IonItem
              key={setting.path}
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/tabs${setting.path}`, "back")}
            >
              {setting.name}
            </IonItem>
          ))}
          {/* Sign Out */}
          <IonItem
            style={{ cursor: "pointer" }}
            onClick={() => {
              removeAuth();
              router.push("/login", "back");
            }}
          >
            Sign Out
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Setting;
