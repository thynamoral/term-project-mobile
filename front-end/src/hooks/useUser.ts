import { useEffect, useState } from "react";
import User from "../entities/User";
import apiClient from "../services/apiClient";
import useAuthStore from "./useAuthStore";

const useUser = () => {
  const [user, setUser] = useState<User | null | any>(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuthStore();

  useEffect(() => {
    const getUser = async () => {
      if (auth?.userId) {
        const { data } = await apiClient.get<User>(`api/users/${auth.userId}`);
        setUser(data);
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    getUser();
  }, [auth?.userId]);

  return { user, loading };
};

export default useUser;
