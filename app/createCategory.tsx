import "react-native-get-random-values";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import ModalWrapper from "../components/ModalWrapper";
import { FontAwesome } from "@expo/vector-icons";
import ColorPicker, {
  HueSlider,
  OpacitySlider,
  Panel1,
  Swatches,
  colorKit,
} from "reanimated-color-picker";
import { useState } from "react";
import { Store } from "../helpers/store";
import { v4 as uuidv4 } from "uuid";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateCategoryModal() {
  const [selectedColor, setSelectedColor] = useState<string>(
    colorKit.randomRgbColor().hex()
  );

  const [randomExampleColors] = useState(
    new Array(6).fill("#fff").map(() => colorKit.randomRgbColor().hex())
  );

  const [title, setTitle] = useState("");

  const createKategory = async () => {
    if (title.length) {
      let newKategory = {
        id: uuidv4(),
        title: title,
        color: selectedColor,
      };

      Store.update((state) => {
        state.kategories.push(newKategory);
      });

      await AsyncStorage.setItem(
        "activities",
        JSON.stringify(Store.getRawState().kategories)
      );
      router.back();
    }
  };

  return (
    <ModalWrapper>
      <Text className="text-white text-3xl font-semibold mx-2 my-1">
        Create Category
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

      <Text className="text-white mx-2">Color</Text>

      <View className="p-2">
        <ColorPicker
          value={selectedColor}
          sliderThickness={25}
          thumbSize={24}
          thumbShape="circle"
          style={{ gap: 8 }}
          onChange={(color) => setSelectedColor(color.hex)}
          boundedThumb
        >
          <Panel1 />
          <HueSlider />
          <OpacitySlider />
          <Swatches colors={randomExampleColors} />
        </ColorPicker>
      </View>

      <View className="border border-white rounded-lg m-2">
        <TouchableOpacity className="w-full" onPress={createKategory}>
          <View className="flex-row items-center mx-2 gap-3 py-2">
            <FontAwesome name="plus" size={24} color={selectedColor} />
            <Text className="text-3xl text-white">Create</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ModalWrapper>
  );
}
