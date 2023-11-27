import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import HeaderButton from "../../../components/HeaderButton";
import { Text, View } from "react-native";
import { DarkTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Store } from "../../../helpers/store";
import { useEffect } from "react";

export type Kategory = {
  id: string;
  title: string;
  color: string;
};

export type Activity = {
  id: string;
  kategory: Kategory;
  title: string;
};

type EntryButonProps = {
  kategory?: string;
  title: string;
  color: string;
};

const EntryButton = ({ kategory, title, color }: EntryButonProps) => {
  return (
    <TouchableOpacity>
      <View
        className="border rounded-lg mx-2 px-4 py-2"
        style={{ borderColor: DarkTheme.colors.border }}
      >
        {kategory ? (
          <View className="flex-row gap-1">
            <Text className="text-white/80 text-sm">{kategory}</Text>
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
  const { activities, kategories } = Store.useState((state) => {
    return {
      activities: state.activities,
      kategories: state.kategories,
    };
  });

  return (
    <SafeAreaView>
      <Header
        title="Kategories"
        headerRight={<HeaderButton icon="plus" link="/createCategory" />}
      />
      <ExplanationBar text="The overall kategory of an activity. Used to group activities together. The kategory defines the color of an activity and is used to make analytics afterwards." />

      <View className="gap-3 my-2">
        {kategories.map((kategory) => (
          <EntryButton
            title={kategory.title}
            key={kategory.id}
            color={kategory.color}
          />
        ))}
      </View>

      <Header
        title="Activities"
        headerRight={<HeaderButton icon="plus" link="/createCategory" />}
      />
      <ExplanationBar text="The activity itself. For example: 'Working at company xy', 'Gym' or 'Spanish lesson'." />

      <View className="gap-3 my-2">
        {activities.map((activity) => (
          <EntryButton
            title={activity.title}
            kategory={activity.kategory.title}
            key={activity.id}
            color={activity.kategory.color}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
