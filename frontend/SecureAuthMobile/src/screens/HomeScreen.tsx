import React from "react";
import { Alert } from "react-native";
import { useAuthStore } from "../store/auth";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  Button,
  Divider,
  Icon,
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const PURPLE600 = "#7C3AED";
const PURPLE700 = "#6D28D9";
const PURPLE800 = "#5B21B6";

export default function HomeScreen() {
  const { user, logout } = useAuthStore();

  const name = user?.name ?? "Usuario";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Seguro que deseas salir?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sí, salir", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <Box safeArea flex={1} bg="#F8FAFC">
      <Box px={5} py={4} bg={PURPLE700}>
        <Heading size="md" color="white" fontWeight="extrabold">
          Cuenta
        </Heading>
        <Text color="white" opacity={0.85}>
          Bienvenido de nuevo 👋
        </Text>
      </Box>

      <VStack flex={1} px={5} py={6} space={6}>
        <Box
          bg="white"
          rounded="2xl"
          shadow="7"
          borderWidth={2}
          borderColor={PURPLE600}
          p={5}
        >
          <HStack space={4} alignItems="center">
            <Avatar
              bg={PURPLE700}
              _text={{ color: "white", fontWeight: "bold" }}
              size="lg"
            >
              {initials || "U"}
            </Avatar>

            <VStack flex={1} space={0.5}>
              <Heading size="md" color="coolGray.900">
                {name}
              </Heading>
              <Text color="coolGray.600">{user?.email}</Text>
            </VStack>

            <Button
              variant="outline"
              borderColor={PURPLE600}
              _text={{ color: PURPLE700, fontWeight: "bold" }}
              _pressed={{ bg: "coolGray.50" }}
              onPress={() => {}}
            >
              Perfil
            </Button>
          </HStack>

          <Divider my={4} bg="coolGray.200" />

          <HStack space={3}>
            <Button
              flex={1}
              bg={PURPLE700}
              _text={{ color: "white", fontWeight: "bold" }}
              _pressed={{ bg: PURPLE800 }}
              leftIcon={<Icon as={FontAwesome} name="home" color="white" size="sm" />}
              onPress={() => {}}
            >
              Dashboard
            </Button>
            <Button
              flex={1}
              variant="outline"
              borderColor={PURPLE600}
              _text={{ color: PURPLE700, fontWeight: "bold" }}
              _pressed={{ bg: "coolGray.50" }}
              leftIcon={
                <Icon as={FontAwesome} name="sign-out" color={PURPLE700} size="sm" />
              }
              onPress={handleLogout}
            >
              Salir
            </Button>
          </HStack>
        </Box>

        <Box
          bg="white"
          rounded="2xl"
          shadow="6"
          borderWidth={1.5}
          borderColor="coolGray.200"
          p={5}
        >
          <Heading size="sm" color="coolGray.800" mb={1}>
            Resumen
          </Heading>
          <Text color="coolGray.600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}