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
  useIonAlert,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema, { TRegisterSchema } from "../schemas/registerSchema";
import apiClient from "../services/apiClient";
import { AxiosError } from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const router = useIonRouter();
  const [signingUp, dismissSigningUp] = useIonLoading();
  const [presentAlertSuccess] = useIonAlert();
  const [presentAlertError] = useIonAlert();

  const handleRegister = async (data: TRegisterSchema) => {
    signingUp({ message: "Signing up..." });
    try {
      const res = await apiClient.post("/api/register", data);
      if (res.status === 201) {
        console.log(res.data);
      }
      dismissSigningUp();
      presentAlertSuccess({
        header: "Success",
        message: "Account created successfully!",
        buttons: ["OK"],
        onDidDismiss: () => {
          router.push("/login");
        },
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        presentAlertError({
          header: "Error",
          message: error?.response?.data?.message,
          buttons: ["OK"],
        });
      }
      dismissSigningUp();
    }
  };

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
        <form onSubmit={handleSubmit(handleRegister)}>
          <IonList>
            <IonItem>
              <IonInput
                type="text"
                label="Username"
                labelPlacement="floating"
                placeholder="Enter your username"
                className="ion-margin-top"
                {...register("username")}
              />
            </IonItem>
            {errors.username && (
              <p style={{ color: "red", margin: 0, marginLeft: "16px" }}>
                {errors.username.message}
              </p>
            )}
            <IonItem>
              <IonInput
                type="email"
                label="Email"
                labelPlacement="floating"
                placeholder="Enter your email"
                className="ion-margin-top"
                {...register("email")}
              />
            </IonItem>
            {errors.email && (
              <p style={{ color: "red", margin: 0, marginLeft: "16px" }}>
                {errors.email.message}
              </p>
            )}
            <IonItem>
              <IonInput
                type="password"
                label="Password"
                labelPlacement="floating"
                placeholder="Enter your password"
                className="ion-margin-top"
                {...register("password")}
              />
            </IonItem>
            {errors.password && (
              <p style={{ color: "red", margin: 0, marginLeft: "16px" }}>
                {errors.password.message}
              </p>
            )}
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
