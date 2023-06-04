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
import { useNavigation } from "@react-navigation/native";
import Error from "../components/Error";
import { useFirebase } from "../hooks/useFirebase";
// import { useDispatch } from "react-redux";
// import { setTokens, setUser } from "../store/user/user.slices";
import store from "../mobx";
import {observer} from "mobx-react-lite";

const LoginScreen = observer(() => {
  const { setTokens, setUser } = store.user;

  const [activeInputName, setActiveInputName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();

  const { firebaseLogin } = useFirebase();

  const navigation = useNavigation();

  const { bottom: bHeight } = useSafeAreaInsets();

  const reset = () => {
    setError("");
    setEmailValue("");
    setPassword("");
  };

  const registerHandler = () => {
    setError(null);
    navigation.navigate("register");
  };

  const loginHandler = async () => {

    setError(null);
    if (!emailValue || !password) {
      setError("Поля не повинні бути пустими!");
      return;
    }
    setLoading(true);
    try {
      const data = await firebaseLogin({ email: emailValue, password });
      const { accessToken, refreshToken } = data.stsTokenManager;
      const { displayName, email, photoURL, uid } = data;
      // dispatch(setTokens({ accessToken, refreshToken }));
      // dispatch(setUser({ displayName, email, photoURL, uid }));
      setTokens({ accessToken, refreshToken });
      setUser({ displayName, email, photoURL, uid });
      reset();
      navigation.navigate("tabs");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.wrapper}
          keyboardVerticalOffset={-150}
        >
          <View style={[styles.container]}>
            <TitleText text={"Увійти"} titleType={"h1"} />
            <View style={styles.inputs}>
              <CustomTextInput
                keyboardType={"email-address"}
                placeholder={"Адреса електронної пошти"}
                onChangeText={(text) => {
                  if (!!error) {
                    setError(null);
                  }
                  setEmailValue(text);
                }}
                isActive={activeInputName === "email"}
                value={emailValue}
                onBlur={() => {
                  setActiveInputName("");
                }}
                onFocus={() => {
                  setActiveInputName("email");
                }}
                editable={!loading}
              />
              <CustomTextInput
                onChangeText={(text) => {
                  if (!!error) {
                    setError(null);
                  }
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
                editable={!loading}
              />
              <Error isError={!!error} errorMessage={error} />
            </View>
            <View style={styles.buttons}>
              <CustomButton
                title={"Увійти"}
                onPress={loginHandler}
                loading={loading}
                disabled={loading}
              />
              <CustomText
                secondary
                style={styles.login}
                onPress={registerHandler}
                disabled={loading}
              >
                {"Немає акаунту? Зареєструватися"}
              </CustomText>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View style={[styles.bottom, { paddingBottom: bHeight }]} />
    </>
  );
});

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
