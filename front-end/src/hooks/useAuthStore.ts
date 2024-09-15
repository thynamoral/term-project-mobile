import { useState, useEffect } from "react";
import { Preferences } from "@capacitor/preferences";

type TAuth = {
  refreshToken: string;
  accessToken: string;
  message: string;
  userId: string;
};

const useAuthStore = () => {
  const [auth, setAuthState] = useState<TAuth | null>(null);
  const [loading, setLoading] = useState(true);

  // Load auth from Preferences when component mounts
  useEffect(() => {
    const loadAuth = async () => {
      const { value } = await Preferences.get({ key: "auth" });
      if (value) {
        setAuthState(JSON.parse(value));
      }
      setLoading(false);
    };
    loadAuth();
  }, []);

  // Update the stored auth in Preferences
  const setAuth = async (auth: TAuth) => {
    setAuthState(auth);
    await Preferences.set({
      key: "auth",
      value: JSON.stringify(auth),
    });
  };

  // Remove auth from Preferences
  const removeAuth = async () => {
    setAuthState(null);
    await Preferences.remove({ key: "auth" });
  };

  return { auth, setAuth, removeAuth, loading };
};

export default useAuthStore;
