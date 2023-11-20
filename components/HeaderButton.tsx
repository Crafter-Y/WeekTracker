import { FontAwesome } from "@expo/vector-icons";
import { Link, LinkProps } from "expo-router";
import { Pressable } from "react-native";

type Props = {
  link: LinkProps<string>["href"];
  icon: React.ComponentProps<typeof FontAwesome>["name"];
};

export default function HeaderButton({ link, icon }: Props) {
  return (
    <Link href={link} asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name={icon}
            size={25}
            color={"#fff"}
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
}
