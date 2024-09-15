import { IonAvatar } from "@ionic/react";

const UserAvatar = ({ slot }: { slot?: string }) => {
  return (
    <IonAvatar slot={slot}>
      <img
        alt="profile-avatar"
        src="https://ionicframework.com/docs/img/demos/avatar.svg"
      />
    </IonAvatar>
  );
};

export default UserAvatar;
