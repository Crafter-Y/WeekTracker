import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { Text } from "../components/Themed";
import { Store } from "../helpers/store";

type SettingsButtonProps = {
  label: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  onPress?: () => void;
};

const SettingsButton = ({
  label,
  icon,
  onPress = () => {},
}: SettingsButtonProps) => {
  return (
    <TouchableOpacity className="w-full" onPress={onPress}>
      <View className="flex-row items-center mx-2 gap-3 py-2">
        <FontAwesome name={icon} size={24} color="white" />
        <Text className="text-3xl">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ModalScreen() {
  const { height } = useWindowDimensions();

  const draggingEnabled = Store.useState((state) => state.draggingEnabled);

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
        <SettingsButton label="Sync Calendar" icon="refresh" />
        <View className="border-b border-white h-0 w-full"></View>
        <SettingsButton label="Apply Template" icon="plus" />
        <View className="border-b border-white h-0 w-full"></View>
        <SettingsButton
          onPress={() => {
            Store.update((state) => {
              state.draggingEnabled = !state.draggingEnabled;
            });
          }}
          label={
            draggingEnabled
              ? "Disable Dragging Events"
              : "Enable Dragging Events"
          }
          icon="hand-pointer-o"
        />
        <View className="border-b border-white h-0 w-full"></View>
        <SettingsButton label="Previous Week" icon="arrow-left" />
        <View className="border-b border-white h-0 w-full"></View>
        <SettingsButton label="Next Week" icon="arrow-right" />

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
