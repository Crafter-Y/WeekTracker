import { router, useLocalSearchParams } from "expo-router";
import ModalWrapper from "../components/ModalWrapper";
import { Text, TouchableOpacity, View } from "react-native";
import { Store } from "../helpers/store";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CategoryContextModal() {
  const { id } = useLocalSearchParams();
  const { activities, categories } = Store.useState((state) => {
    return {
      activities: state.activities,
      categories: state.categories,
    };
  });

  const deleteCategory = async () => {
    const newCategoryList = [
      ...categories.filter((category) => category.id != id),
    ];

    const newActivityList = [
      ...activities.filter((activity) => activity.category?.id != id),
    ];

    Store.update((state) => {
      state.categories = newCategoryList;
      state.activities = newActivityList;
    });

    await AsyncStorage.setItem(
      "categories",
      JSON.stringify(Store.getRawState().categories)
    );
    await AsyncStorage.setItem(
      "activities",
      JSON.stringify(Store.getRawState().activities)
    );
    router.back();
  };

  return (
    <ModalWrapper>
      <Text className="text-white text-3xl font-semibold mx-2 my-1">
        {categories.filter((category) => category.id == id)[0]?.title}
      </Text>

      <View className="border-b border-white h-0 w-full" />

      <View className="border border-white rounded-lg m-2">
        <TouchableOpacity className="w-full" onPress={deleteCategory}>
          <View className="flex-row items-center mx-2 gap-3 py-2">
            <FontAwesome name="close" size={24} color="white" />
            <Text className="text-3xl text-white">Delete Category</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ModalWrapper>
  );
}
