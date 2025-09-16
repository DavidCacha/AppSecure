import React from "react";
import { HStack, Button, Icon, Divider, Text } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type Props = {
  onGoogle?: () => void;
  onFacebook?: () => void;
  onGithub?: () => void;
  color?: { 600: string; 700: string; 800: string };
};

const DEFAULT_PURPLE = { 600: "#7C3AED", 700: "#6D28D9", 800: "#5B21B6" };

export default function SocialAuthRow({
  onGoogle,
  onFacebook,
  onGithub,
  color = DEFAULT_PURPLE,
}: Props) {
  return (
    <>
      <HStack alignItems="center" space={2} my={2}>
        <Divider flex={1} bg="coolGray.300" />
        <Text fontSize="sm" color="coolGray.500">
          O continúa con
        </Text>
        <Divider flex={1} bg="coolGray.300" />
      </HStack>

      <HStack space={4} justifyContent="center">
        <Button
          onPress={onGoogle}
          leftIcon={<Icon as={FontAwesome} name="google" size="sm" color={color[800]} />}
          variant="outline"
          borderColor={color[600]}
          _text={{ color: color[700] }}
          _pressed={{ bg: "coolGray.100" }}
          rounded="lg"
        >
          Google
        </Button>

        <Button
          onPress={onFacebook}
          leftIcon={<Icon as={FontAwesome} name="facebook" size="sm" color={color[700]} />}
          variant="outline"
          borderColor={color[600]}
          _text={{ color: color[700] }}
          _pressed={{ bg: "coolGray.100" }}
          rounded="lg"
        >
          Facebook
        </Button>

        <Button
          onPress={onGithub}
          leftIcon={<Icon as={FontAwesome} name="github" size="sm" color={color[700]} />}
          variant="outline"
          borderColor={color[600]}
          _text={{ color: color[700] }}
          _pressed={{ bg: "coolGray.100" }}
          rounded="lg"
        >
          GitHub
        </Button>
      </HStack>
    </>
  );
}
