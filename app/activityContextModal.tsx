import { router, useLocalSearchParams } from "expo-router";
import ModalWrapper from "../components/ModalWrapper";
import { Text, TouchableOpacity, View } from "react-native";
import { Store } from "../helpers/store";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ActivityContextModal() {
  const { id } = useLocalSearchParams();
  const activities = Store.useState((state) => state.activities);

  const deleteActivity = async () => {
    const newActivityList = [
      ...activities.filter((activity) => activity.id != id),
    ];

    Store.update((state) => {
      state.activities = newActivityList;
    });

    await AsyncStorage.setItem(
      "activities",
      JSON.stringify(Store.getRawState().activities)
    );
    router.back();
  };

  return (
    <ModalWrapper>
      <Text className="text-white text-3xl font-semibold mx-2 my-1">
        {activities.filter((activity) => activity.id == id)[0]?.title}
      </Text>

      <View className="border-b border-white h-0 w-full" />

      <View className="border border-white rounded-lg m-2">
        <TouchableOpacity className="w-full" onPress={deleteActivity}>
          <View className="flex-row items-center mx-2 gap-3 py-2">
            <FontAwesome name="close" size={24} color="white" />
            <Text className="text-3xl text-white">Delete Activity</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ModalWrapper>
  );
}
