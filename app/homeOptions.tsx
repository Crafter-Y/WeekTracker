import { TouchableOpacity, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Store } from "../helpers/store";
import ModalWrapper from "../components/ModalWrapper";

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
        <Text className="text-3xl text-white">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ModalScreen() {
  const draggingEnabled = Store.useState((state) => state.draggingEnabled);

  return (
    <ModalWrapper>
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
          draggingEnabled ? "Disable Dragging Events" : "Enable Dragging Events"
        }
        icon="hand-pointer-o"
      />
      <View className="border-b border-white h-0 w-full"></View>
      <SettingsButton label="Previous Week" icon="arrow-left" />
      <View className="border-b border-white h-0 w-full"></View>
      <SettingsButton label="Next Week" icon="arrow-right" />
    </ModalWrapper>
  );
}
