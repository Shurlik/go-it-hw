import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from "react-native";
import React, { useState } from "react";

import Colors from "../assets/Colors";
import TitleText from "../components/typography/TitleText";
import CustomTextInput from "../components/CustomTextInput";
import UserPhoto from "../components/UserPhoto";
import CustomButton from "../components/CustomButton";
import CustomText from "../components/typography/CustomText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LoginScreen = () => {
    const [activeInputName, setActiveInputName] = useState("");

    const { bottom: bHeight } = useSafeAreaInsets();

    const registerHandler = () => {
        console.log("register");
    };
    const loginHandler = () => {
        console.log("enter");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.wrapper}
                    keyboardVerticalOffset={-200}
                >
                    <View
                        style={[
                            styles.container,
                            // { paddingBottom: 50 + bHeight },
                        ]}
                    >
                        <TitleText text={"Войти"} titleType={"h1"} />
                        <View style={styles.inputs}>
                            <CustomTextInput
                                placeholder={"Адрес электронной почты"}
                                isActive={activeInputName === "email"}
                                onBlur={() => {
                                    setActiveInputName("");
                                }}
                                onFocus={() => {
                                    setActiveInputName("email");
                                }}
                            />
                            <CustomTextInput
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
                                onPress={registerHandler}
                            />
                            <CustomText
                                secondary
                                style={styles.login}
                                onPress={loginHandler}
                            >
                                {"Нет аккаунта? Зарегистрироваться"}
                            </CustomText>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                <View style={[styles.bottom, { paddingBottom: bHeight }]} />
            </>
        </TouchableWithoutFeedback>
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
