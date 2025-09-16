/* cspell:disable */
import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { api } from "../api/client";
import { useAuthStore } from "../store/auth";
import SocialAuthRow from "../components/SocialAuthRow";

type LoginValues = { email: string; password: string };
type User = { id: string; email: string; name: string };
type AuthResp = { accessToken: string; user: User; expiresAt?: string };

const isAuthResp = (x: unknown): x is AuthResp =>
  !!x &&
  typeof x === "object" &&
  typeof (x as any).accessToken === "string" &&
  (x as any).user &&
  typeof (x as any).user.id === "string" &&
  typeof (x as any).user.email === "string" &&
  typeof (x as any).user.name === "string";

const getErrMsg = (err: any) => {
  if (err?.response) {
    const status = err.response.status;
    const body =
      typeof err.response.data === "object"
        ? JSON.stringify(err.response.data)
        : String(err.response.data);
    return `HTTP ${status}: ${body}`;
  }
  if (err?.request)
    return "Sin respuesta del servidor (¿URL correcta / dispositivo o emulador conectado?)";
  return err?.message ?? "Error desconocido";
};

const LoginSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().required("Requerido"),
});

const PURPLE600 = "#7C3AED";
const PURPLE700 = "#6D28D9";
const PURPLE800 = "#5B21B6";

export default function LoginScreen({ navigation }: any) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [redirecting, setRedirecting] = useState(false); 

  const loginMut = useMutation<AuthResp, AxiosError<any>, LoginValues>({
    mutationFn: async (body) => {
      const url = api.getUri({ url: "/auth/login" });
      if (__DEV__) console.log("POST a:", url, body);
      const { data } = await api.post<AuthResp>("/auth/login", body, { timeout: 10000 });
      return data;
    },
    onSuccess: (data) => {
      if (!isAuthResp(data)) {
        Alert.alert("Error", "Respuesta inválida del servidor");
        return;
      }
      setAuth(data.accessToken, data.user);
      setRedirecting(true); 
      setTimeout(() => {
        navigation.replace("Home");
      });  
    },
    onError: (err) => {
      Alert.alert("Error al iniciar sesión", getErrMsg(err));
    },
  });

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Prueba técnica</Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>

            <Formik<LoginValues>
              initialValues={{ email: "demo@example.com", password: "Secret123!" }}
              validationSchema={LoginSchema}
              onSubmit={async (vals, { setFieldError, setStatus }) => {
                setStatus(undefined);
                try {
                  await loginMut.mutateAsync(vals); 
                } catch (err: any) {
                  const res = err?.response;
                  if (res?.data?.errors && typeof res.data.errors === "object") {
                    Object.entries(res.data.errors).forEach(([k, v]) => {
                      setFieldError(k as keyof LoginValues, String(v));
                    });
                    return;
                  }
                  if (res?.status === 401) {
                    setFieldError("password", "Credenciales inválidas");
                    return;
                  }
                  setStatus(getErrMsg(err));
                }
              }}
            >
              {({
                values,
                handleChange,
                setFieldTouched,
                handleSubmit,
                errors,
                touched,
                status,
              }: FormikProps<LoginValues>) => (
                <View style={{ gap: 16 }}>
                  {!!status && (
                    <View style={styles.banner}>
                      <Text style={styles.bannerText}>{status}</Text>
                    </View>
                  )}

                  <View>
                    <Text style={styles.label}>Email</Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        {
                          borderColor:
                            touched.email && errors.email
                              ? "#DC2626"
                              : emailFocus
                              ? PURPLE700
                              : PURPLE600,
                        },
                      ]}
                    >
                      <TextInput
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={() => {
                          setEmailFocus(false);
                          setFieldTouched("email", true);
                        }}
                        onFocus={() => setEmailFocus(true)}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder="tucorreo@dominio.com"
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                      />
                    </View>
                    {!!(touched.email && errors.email) && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  <View>
                    <Text style={styles.label}>Password</Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        {
                          borderColor:
                            touched.password && errors.password
                              ? "#DC2626"
                              : passFocus
                              ? PURPLE700
                              : PURPLE600,
                        },
                      ]}
                    >
                      <TextInput
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={() => {
                          setPassFocus(false);
                          setFieldTouched("password", true);
                        }}
                        onFocus={() => setPassFocus(true)}
                        secureTextEntry
                        placeholder="••••••••"
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                      />
                    </View>
                    {!!(touched.password && errors.password) && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    disabled={loginMut.isPending || redirecting}
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          loginMut.isPending || redirecting ? PURPLE800 : PURPLE700,
                      },
                    ]}
                  >
                    {loginMut.isPending ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>
                        {redirecting ? "Entrando..." : "Entrar"}
                      </Text>
                    )}
                  </TouchableOpacity>

                  

                  <Text onPress={() => navigation.navigate("Register")} style={styles.link}>
                    ¿No tienes cuenta? Regístrate
                  </Text>

                  {__DEV__ && (
                    <Text style={styles.debugText}>
                      status: {loginMut.status} | isPending: {String(loginMut.isPending)} | isSuccess:{" "}
                      {String(loginMut.isSuccess)} | isError: {String(loginMut.isError)}
                    </Text>
                  )}

                  <SocialAuthRow
                    onGoogle={() => console.log("Google pressed")}
                    onFacebook={() => console.log("Facebook pressed")}
                    onGithub={() => console.log("GitHub pressed")}
                  />
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: { backgroundColor: "#FEE2E2", padding: 10, borderRadius: 8 },
  bannerText: { color: "#991B1B" },
  safe: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingBottom: 24 },
  header: { paddingTop: 8, paddingBottom: 8, alignItems: "center" },
  headerTitle: { color: PURPLE700, fontSize: 35, padding: 8, fontWeight: "900" },
  container: { paddingHorizontal: 20, paddingTop: 12, gap: 20 },
  title: { fontSize: 28, fontWeight: "700", color: "#111827", marginBottom: 10, textAlign: "center" },
  label: { fontSize: 14, color: "#374151", marginBottom: 6 },
  inputWrapper: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  input: { height: 40, fontSize: 16, color: "#111827" },
  errorText: { marginTop: 6, color: "#DC2626", fontSize: 12 },
  button: { height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  link: { color: PURPLE700, textAlign: "center", fontWeight: "600", marginTop: 8 },
  debugText: { fontSize: 12, color: "#6B7280", marginTop: 8 },
});
