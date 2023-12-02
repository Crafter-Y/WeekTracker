import "react-native-get-random-values";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import ModalWrapper from "../components/ModalWrapper";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Store } from "../helpers/store";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { v4 as uuidv4 } from "uuid";
import { Activity } from "./(tabs)/events";

export default function CreateCategoryModal() {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories: ItemType<string>[] = Store.useState((state) =>
    state.categories.map((category) => {
      return {
        label: category.title,
        value: category.id,
        icon: () => (
          <View
            className="rounded-full h-4 w-4"
            style={{ backgroundColor: category.color }}
          />
        ),
      };
    })
  );

  const createActivity = async () => {
    if (title.length && selectedCategory) {
      let completeSelectedCategories = Store.getRawState().categories.filter(
        (category) => category.id == selectedCategory
      );
      let completeSelectedCategory;
      if (completeSelectedCategories.length) {
        completeSelectedCategory = completeSelectedCategories[0];
      } else {
        return;
      }

      let newActicvity: Activity = {
        id: uuidv4(),
        title: title,
        category: completeSelectedCategory,
      };

      Store.update((state) => {
        state.activities.push(newActicvity);
      });

      await AsyncStorage.setItem(
        "activities",
        JSON.stringify(Store.getRawState().activities)
      );
      router.back();
    }
  };

  return (
    <ModalWrapper>
      <Text className="text-white text-3xl font-semibold mx-2 my-1">
        Create Activity
      </Text>
      <View className="border-b border-white h-0 w-full"></View>

      <Text className="text-white mx-2">Title</Text>
      <TextInput
        className="mx-2 border-b border-b-white text-white text-lg"
        placeholder="Insert title"
        placeholderTextColor="gray"
        cursorColor="lightgray"
        value={title}
        onChangeText={setTitle}
      />

      <Text className="text-white mx-2">Category</Text>

      <View className="py-1 px-2 z-10">
        <DropDownPicker
          open={open}
          value={selectedCategory}
          items={categories}
          setOpen={setOpen}
          setValue={setSelectedCategory}
          theme="DARK"
          style={{
            backgroundColor: "black",
            borderWidth: 1,
            borderColor: "white",
          }}
          dropDownContainerStyle={{
            backgroundColor: "black",
            borderWidth: 1,
            borderColor: "white",
          }}
        />
      </View>

      <View className="border border-white rounded-lg m-2">
        <TouchableOpacity className="w-full" onPress={createActivity}>
          <View className="flex-row items-center mx-2 gap-3 py-2">
            <FontAwesome name="plus" size={24} color="white" />
            <Text className="text-3xl text-white">Create</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ModalWrapper>
  );
}
