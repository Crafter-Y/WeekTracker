import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";

import { Text, View } from "../components/Themed";

export default function ModalScreen() {
  const { height, width } = useWindowDimensions();

  return (
    <Pressable
      className={`items-center justify-center bg-black/40 bg-opacity-30 h-full`}
      onPress={router.back}
    >
      <View
        className="bg-black rounded-lg border border-white"
        style={{ maxHeight: height * 0.8 }}
      >
        <Text style={styles.title}>Modal</Text>

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
