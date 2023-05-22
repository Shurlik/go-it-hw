import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import React, { useState } from "react";

import Colors from "../assets/Colors";
import TitleText from "../components/typography/TitleText";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import CustomText from "../components/typography/CustomText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LoginScreen = () => {
    const [activeInputName, setActiveInputName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { bottom: bHeight } = useSafeAreaInsets();

    const registerHandler = () => {
        console.log("will go to register in future");
    };
    const loginHandler = () => {
        console.log("\nemail: ", email, "\npass: ", password);
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.wrapper}
                    keyboardVerticalOffset={-150}
                >
                    <View style={[styles.container]}>
                        <TitleText text={"Войти"} titleType={"h1"} />
                        <View style={styles.inputs}>
                            <CustomTextInput
                                keyboardType={"email-address"}
                                onChangeText={(text) => {
                                    setEmail(text);
                                }}
                                placeholder={"Адрес электронной почты"}
                                isActive={activeInputName === "email"}
                                value={email}
                                onBlur={() => {
                                    setActiveInputName("");
                                }}
                                onFocus={() => {
                                    setActiveInputName("email");
                                }}
                            />
                            <CustomTextInput
                                onChangeText={(text) => {
                                    setPassword(text);
                                }}
                                value={password}
                                placeholder={"Пароль"}
                                isPassword
                                isActive={activeInputName === "password"}
                                onBlur={() => {
                                    setActiveInputName("");
                                }}
                                onFocus={() => {
                                    setActiveInputName("password");
                                }}
                            />
                        </View>
                        <View style={styles.buttons}>
                            <CustomButton
                                title={"Войти"}
                                onPress={loginHandler}
                            />
                            <CustomText
                                secondary
                                style={styles.login}
                                onPress={registerHandler}
                            >
                                {"Нет аккаунта? Зарегистрироваться"}
                            </CustomText>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            <View style={[styles.bottom, { paddingBottom: bHeight }]} />
        </>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: Colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: "center",
        paddingTop: 30,
        paddingHorizontal: 16,
    },
    inputs: {
        width: "100%",
        marginTop: 30,
    },
    buttons: {
        marginTop: 40,
        paddingBottom: 30,
        width: "100%",
        alignItems: "center",
    },
    login: {
        marginTop: 16,
    },
    wrapper: { flex: 1, width: "100%", justifyContent: "flex-end" },
    bottom: {
        backgroundColor: Colors.white,
        width: "100%",
        ...Platform.select({
            ios: {
                height: 180,
            },
            android: {
                height: 70,
            },
        }),
    },
});
