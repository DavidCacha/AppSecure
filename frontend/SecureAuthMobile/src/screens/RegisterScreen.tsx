/* cspell:disable */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/client";

const RegisterSchema = Yup.object({
  name: Yup.string().min(2, "Muy corto").required("Requerido"),
  email: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().min(8, "Mínimo 8").required("Requerido"),
});

type Values = { name: string; email: string; password: string };

const PURPLE600 = "#7C3AED";
const PURPLE700 = "#6D28D9";
const PURPLE800 = "#5B21B6";

export default function RegisterScreen({ navigation }: any) {
  const [focus, setFocus] = useState<{ name: boolean; email: boolean; password: boolean }>({
    name: false,
    email: false,
    password: false,
  });

  const regMut = useMutation({
    mutationFn: async (body: Values) => {
      const { data } = await api.post("/auth/register", body);
      return data as { id: string; email: string; name: string };
    },
    onSuccess: () => {
      Alert.alert("Listo", "Cuenta creada. Inicia sesión.");
      navigation.replace("Login");
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.error ??
        (typeof err?.response?.data === "string" ? err.response.data : "No fue posible registrar");
      Alert.alert("Error", msg);
    },
  });

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Crear cuenta</Text>

        <Formik<Values>
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={RegisterSchema}
          onSubmit={(v) => regMut.mutate(v)}
        >
          {({
            values,
            handleChange,
            setFieldTouched,
            handleSubmit,
            errors,
            touched,
          }: FormikProps<Values>) => (
            <View style={{ gap: 16 }}>
              <View>
                <Text style={styles.label}>Nombre</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      borderColor:
                        touched.name && errors.name
                          ? "#DC2626" 
                          : focus.name
                          ? PURPLE700
                          : PURPLE600,
                    },
                  ]}
                >
                  <TextInput
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={() => {
                      setFocus((s) => ({ ...s, name: false }));
                      setFieldTouched("name", true);
                    }}
                    onFocus={() => setFocus((s) => ({ ...s, name: true }))}
                    placeholder="Tu nombre"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                  />
                </View>
                {!!(touched.name && errors.name) && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              <View>
                <Text style={styles.label}>Email</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      borderColor:
                        touched.email && errors.email
                          ? "#DC2626"
                          : focus.email
                          ? PURPLE700
                          : PURPLE600,
                    },
                  ]}
                >
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={() => {
                      setFocus((s) => ({ ...s, email: false }));
                      setFieldTouched("email", true);
                    }}
                    onFocus={() => setFocus((s) => ({ ...s, email: true }))}
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
                          : focus.password
                          ? PURPLE700
                          : PURPLE600,
                    },
                  ]}
                >
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={() => {
                      setFocus((s) => ({ ...s, password: false }));
                      setFieldTouched("password", true);
                    }}
                    onFocus={() => setFocus((s) => ({ ...s, password: true }))}
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
                disabled={regMut.isPending}
                style={[
                  styles.button,
                  { backgroundColor: regMut.isPending ? PURPLE800 : PURPLE700 },
                ]}
              >
                {regMut.isPending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Registrarme</Text>
                )}
              </TouchableOpacity>

              <Text
                onPress={() => navigation.replace("Login")}
                style={styles.link}
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 12 },
  headerTitle: {
    color: PURPLE700,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },
  container: { gap: 20 },
  title: { padding:18, fontSize: 28, fontWeight: "700", color: "#111827", marginBottom: 10, textAlign: "center" },
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
});
