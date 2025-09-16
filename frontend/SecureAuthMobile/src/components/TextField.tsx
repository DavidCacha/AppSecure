import React from "react";
import { View, Text, TextInput } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
};

export default function TextField({ label, value, onChangeText, secureTextEntry, autoCapitalize, error }: Props) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontWeight: "600" }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, borderColor: error ? "crimson" : "#ccc" }}
      />
      {!!error && <Text style={{ color: "crimson" }}>{error}</Text>}
    </View>
  );
}
