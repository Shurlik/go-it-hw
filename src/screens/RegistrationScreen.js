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
import { useNavigation } from "@react-navigation/native";

const RegistrationScreen = () => {
  const [activeInputName, setActiveInputName] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { bottom: bHeight } = useSafeAreaInsets();
  const navigation = useNavigation();

  const registerHandler = () => {
    navigation.navigate("tabs");
  };
  const loginHandler = () => {
    navigation.navigate("login");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        keyboardVerticalOffset={-200}
        style={styles.wrapper}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={[styles.container, { paddingBottom: 50 + bHeight }]}>
            <TitleText text={"Реєстрація"} titleType={"h1"} />
            <View style={styles.inputs}>
              <CustomTextInput
                onChangeText={(text) => {
                  setLogin(text);
                }}
                placeholder={"Логін"}
                isActive={activeInputName === "login"}
                onBlur={() => {
                  setActiveInputName("");
                }}
                onFocus={() => {
                  setActiveInputName("login");
                }}
              />
              <CustomTextInput
                keyboardType={"email-address"}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                placeholder={"Адреса електронної пошти"}
                isActive={activeInputName === "email"}
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
                title={"Зареєстуватися"}
                onPress={registerHandler}
              />
              <CustomText secondary style={styles.login} onPress={loginHandler}>
                {"Вже є акаунт? Увійти"}
              </CustomText>
            </View>
            <UserPhoto />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 16,
  },
  inputs: {
    width: "100%",
    marginTop: 30,
  },
  buttons: {
    marginTop: 40,
    paddingBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  login: {
    marginTop: 16,
  },
  wrapper: { flex: 1, width: "100%" },
  content: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
