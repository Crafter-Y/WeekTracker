import { DarkTheme } from "@react-navigation/native";
import { View, Text } from "react-native";

type Props = {
  title: string;
  headerRight?: React.ReactNode;
};

export default function Header({ title, headerRight }: Props) {
  return (
    <View
      style={{
        backgroundColor: DarkTheme.colors.card,
        borderBottomColor: DarkTheme.colors.border,
      }}
      className="py-4 border-b px-4 flex-row justify-between"
    >
      <Text
        className="text-2xl font-semibold"
        style={{ color: DarkTheme.colors.text }}
      >
        {title}
      </Text>
      {headerRight ? headerRight : undefined}
    </View>
  );
}
