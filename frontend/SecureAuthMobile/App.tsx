import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { QueryProvider } from "./src/providers/QueryProvider";
import { AuthProvider } from "./src/providers/AuthProvider";
import { useAuthStore } from "./src/store/auth";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";

import { NativeBaseProvider, extendTheme } from "native-base";

const Stack = createNativeStackNavigator();

const theme = extendTheme({
  colors: {
    primary: {
      50:  "#F3E8FF",
      100: "#E9D5FF",
      200: "#D8B4FE",
      300: "#C084FC",
      400: "#A855F7",
      500: "#9333EA",
      600: "#7C3AED", 
      700: "#6D28D9",
      800: "#5B21B6",
      900: "#4C1D95",
    },
  },
});

function Router() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#7C3AED" }, 
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Iniciar Sesión" }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Registro" }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#7C3AED" />
        <QueryProvider>
          <AuthProvider>
            <NavigationContainer>
              <Router />
            </NavigationContainer>
          </AuthProvider>
        </QueryProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
