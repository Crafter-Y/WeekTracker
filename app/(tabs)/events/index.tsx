import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import HeaderButton from "../../../components/HeaderButton";
import { Text, View } from "react-native";
import { DarkTheme } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Store } from "../../../helpers/store";
import { useEffect, useState } from "react";

export type Category = {
  id: string;
  title: string;
  color: string;
};

export type Activity = {
  id: string;
  category: Category;
  title: string;
};

type EntryButonProps = {
  category?: string;
  title: string;
  color: string;
};

const EntryButton = ({ category, title, color }: EntryButonProps) => {
  return (
    <TouchableOpacity>
      <View
        className="border rounded-lg mx-2 px-4 py-2"
        style={{ borderColor: DarkTheme.colors.border }}
      >
        {category ? (
          <View className="flex-row gap-1">
            <Text className="text-white/80 text-sm">{category}</Text>
            <Text className="text-white/40 text-sm">/</Text>
          </View>
        ) : undefined}
        <View className="flex-row items-center gap-2">
          <View
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <Text className="text-white text-xl font-semibold">{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

type ExplanationProps = {
  text: string;
};

const ExplanationBar = ({ text }: ExplanationProps) => {
  return (
    <View
      className="border-b px-4 py-2"
      style={{
        backgroundColor: "'rgb(15, 15, 15)'",
        borderColor: DarkTheme.colors.border,
      }}
    >
      <Text className="text-white/90 text-sm">{text}</Text>
    </View>
  );
};

export default function EventsScreen() {
  const { activities, categories } = Store.useState((state) => {
    return {
      activities: state.activities,
      categories: state.categories,
    };
  });

  const [displayedActivities, setDisplayedActivities] = useState<Activity[]>(
    []
  );
  const [displayedCategories, setDisplayedCategories] = useState<Category[]>(
    []
  );

  useEffect(() => {
    const activitiesCopy = [...activities];

    activitiesCopy.sort((a, b) => (a.category.id > b.category.id ? 1 : -1));

    setDisplayedActivities(activitiesCopy);
  }, [activities]);

  useEffect(() => {
    const categoriesCopy = [...categories];

    categoriesCopy.sort((a, b) => (a.id > b.id ? 1 : -1));

    setDisplayedCategories(categoriesCopy);
  }, [categories]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          title="Categories"
          headerRight={<HeaderButton icon="plus" link="/createCategory" />}
        />
        <ExplanationBar text="The overall category of an activity. Used to group activities together. The category defines the color of an activity and is used to make analytics afterwards." />

        <View className="gap-2 my-2">
          {displayedCategories.map((category) => (
            <EntryButton
              title={category.title}
              key={category.id}
              color={category.color}
            />
          ))}
        </View>

        <Header
          title="Activities"
          headerRight={<HeaderButton icon="plus" link="/createActivity" />}
        />
        <ExplanationBar text="The activity itself. For example: 'Working at company xy', 'Gym' or 'Spanish lesson'." />

        <View className="gap-2 my-2">
          {displayedActivities.map((activity) => (
            <EntryButton
              title={activity.title}
              category={activity.category?.title}
              key={activity.id}
              color={activity.category?.color}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
