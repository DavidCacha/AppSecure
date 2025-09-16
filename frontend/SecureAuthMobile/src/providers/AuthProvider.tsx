import React from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { api } from "../api/client";
import { useAuthStore } from "../store/auth";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token, setAuth, setUser, logout } = useAuthStore();
  const [booting, setBooting] = React.useState(true);

  React.useEffect(() => {
    const restore = async () => {
      try {
        if (!token) return;

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const { data } = await api.get<{ id: string; email: string; name: string }>("/auth/me");

        setUser(data);

       
      } catch (err: any) {
        await logout();
        Alert.alert("Sesión expirada", "Por favor vuelve a iniciar sesión.");
      } finally {
        setBooting(false);
      }
    };

    restore();
  }, []); 

  if (booting) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <>{children}</>;
};
