import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { Store } from "../helpers/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let activities = await AsyncStorage.getItem("activities");
    let categories = await AsyncStorage.getItem("categories");

    if (activities != null) {
      Store.update((state) => {
        state.activities = JSON.parse(activities as string);
        state.categories = JSON.parse(categories as string);
      });
    }
  };

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="homeOptions"
          options={{ presentation: "transparentModal", headerShown: false }}
        />
        <Stack.Screen
          name="createCategory"
          options={{ presentation: "transparentModal", headerShown: false }}
        />
        <Stack.Screen
          name="createActivity"
          options={{ presentation: "transparentModal", headerShown: false }}
        />
      </Stack>
      <StatusBar backgroundColor={DarkTheme.colors.card} />
    </ThemeProvider>
  );
}
