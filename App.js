import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  return (
    <SafeAreaProvider style={styles.wrapper}>
      <NavigationContainer theme={MyTheme}>
        <ImageBackground
          style={styles.container}
          source={require("./src/assets/bg.png")}
          resizeMethod="resize"
        >
          <RootNavigator />
        </ImageBackground>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  wrapper: { flex: 1 },
});
