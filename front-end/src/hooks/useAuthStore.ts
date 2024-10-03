import { useState, useEffect } from "react";
import { Preferences } from "@capacitor/preferences";
import { useIonRouter } from "@ionic/react";

type TAuth = {
  refreshToken: string;
  accessToken: string;
  message: string;
  userId: string;
  username: string;
};

// custom event for auth state changes
const authStateChanged = new Event("authStateChanged");

const useAuthStore = () => {
  const [auth, setAuthState] = useState<TAuth | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useIonRouter();

  // Load auth from Preferences when component mounts
  useEffect(() => {
    const loadAuth = async () => {
      const { value } = await Preferences.get({ key: "auth" });
      if (value) {
        setAuthState(JSON.parse(value));
      } else {
        setAuthState(null);
      }
      setLoading(false);
    };
    loadAuth();
  }, []);

  // Update the stored auth in Preferences
  const setAuth = async (auth: TAuth) => {
    setLoading(true);
    await Preferences.set({
      key: "auth",
      value: JSON.stringify(auth),
    });
    setAuthState(auth);
    setLoading(false);
    window.dispatchEvent(authStateChanged);
  };

  // Remove auth from Preferences
  const removeAuth = async () => {
    setLoading(true);
    setAuthState(null);
    await Preferences.remove({ key: "auth" });
    setLoading(false);
    router.push("/login", "back");
  };

  return { auth, setAuthState, setAuth, removeAuth, loading };
};

export default useAuthStore;
