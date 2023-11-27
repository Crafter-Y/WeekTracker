import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Pressable,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Text,
} from "react-native";

type Props = {
  children: React.ReactNode;
};

export default function ModalWrapper({ children }: Props) {
  const { height } = useWindowDimensions();

  return (
    <Pressable
      className={`items-center justify-center bg-black/40 bg-opacity-30 h-full`}
      onPress={router.back}
    >
      <View className="w-5/6 bg-none items-end">
        <TouchableOpacity onPress={router.back}>
          <FontAwesome name="close" size={42} color="white" />
        </TouchableOpacity>
      </View>
      <View
        className="bg-black rounded-lg border border-white w-5/6"
        style={{ maxHeight: height * 0.8 }}
      >
        <Pressable>{children}</Pressable>

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </Pressable>
  );
}
