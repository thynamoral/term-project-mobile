import { useEffect, useState } from "react";
import User from "../entities/User";
import apiClient from "../services/apiClient";
import useAuthStore from "./useAuthStore";

const useUser = () => {
  const { auth, loading: authLoading } = useAuthStore();
  const [user, setUser] = useState<User | null | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (auth) {
        const res = await apiClient.get<User>(`api/users/${auth.userId}`);
        if (res.status === 200) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, [auth, authLoading]);

  return { user, loading };
};

export default useUser;
