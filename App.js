import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground } from "react-native";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
    return (
        <SafeAreaProvider style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={require("./src/assets/bg.png")}
                resizeMethod="resize"
            >
                <RegistrationScreen />
                {/* <LoginScreen /> */}
            </ImageBackground>
            <StatusBar style="auto" />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: '100%'
    },
});
