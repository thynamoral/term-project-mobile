import { Preferences } from "@capacitor/preferences";

export const setAuthToken = async (token: string) => {
  return await Preferences.set({
    key: "authToken",
    value: token,
  });
};

export const getAuthToken = async () => {
  return await Preferences.get({ key: "authToken" });
};

export const removeAuthToken = async () => {
  return await Preferences.remove({ key: "authToken" });
};
