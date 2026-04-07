import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { config } from "../config";
import { seedData } from "../data/seed";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && config.features.useSeedData) {
      setUser(seedData.users[0]);
      setLoading(false);
      return;
    }
    if (!token) return setLoading(false);
    api.me().then(setUser).catch(() => localStorage.removeItem("token")).finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    login: async (payload) => {
      if (config.features.useSeedData) {
        setUser(seedData.users.find((u) => u.email === payload.email) || seedData.users[0]);
        localStorage.setItem("token", "seed-token");
        return;
      }
      const data = await api.login(payload);
      localStorage.setItem("token", data.token);
      setUser(data.user);
    },
    register: async (payload) => {
      if (config.features.useSeedData) {
        setUser({ ...seedData.users[0], name: payload.name, email: payload.email });
        localStorage.setItem("token", "seed-token");
        return;
      }
      const data = await api.register(payload);
      localStorage.setItem("token", data.token);
      setUser(data.user);
    },
    logout: () => {
      localStorage.removeItem("token");
      setUser(null);
    },
    refreshUser: async () => setUser(await api.me()),
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
