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
import Error from "../components/Error";
import { useFirebase } from "../hooks/useFirebase";
// import { setTokens, setUser } from "../store/user/user.slices";
// import { useDispatch } from "react-redux";
import store from "../mobx";
import * as ImagePicker from "expo-image-picker";
import {observer} from "mobx-react-lite";

const RegistrationScreen = observer(() => {
  const { setTokens, setUser } = store.user;

  const [activeInputName, setActiveInputName] = useState("");
  const [login, setLogin] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const { firebaseSignUp, firebaseFileUpload } = useFirebase();

  const { bottom: bHeight } = useSafeAreaInsets();
  const navigation = useNavigation();

  const getImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage({
        uri: result.assets[0].uri,
        fileName: result.assets[0].fileName,
      });
    }
  };

  const reset = () => {
    setError("");
    setLogin("");
    setEmailValue("");
    setPassword("");
  };

  const registerHandler = async () => {
    setError(null);
    if (password.length < 8) {
      setError("Довжина пароля меньша 8 символів");
      return;
    }
    try {
      setLoading(true);
      const photoLink = await firebaseFileUpload(image?.uri, image?.fileName);

      const data = await firebaseSignUp({
        email: emailValue,
        password,
        login,
        photoURL: photoLink,
      });
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
      console.log("error: ", e.message);
    }
    setLoading(false);
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
                editable={!loading}
                value={login}
              />
              <CustomTextInput
                keyboardType={"email-address"}
                onChangeText={(text) => {
                  if (!!error) {
                    setError(null);
                  }
                  setEmailValue(text);
                }}
                placeholder={"Адреса електронної пошти"}
                isActive={activeInputName === "email"}
                onBlur={() => {
                  setActiveInputName("");
                }}
                onFocus={() => {
                  setActiveInputName("email");
                }}
                editable={!loading}
                value={emailValue}
              />
              <CustomTextInput
                onChangeText={(text) => {
                  if (!!error) {
                    setError(null);
                  }
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
                editable={!loading}
                value={password}
              />
              <Error isError={!!error} errorMessage={error} />
            </View>
            <View style={styles.buttons}>
              <CustomButton
                title={"Зареєстуватися"}
                onPress={registerHandler}
                disabled={loading}
                loading={loading}
              />
              <CustomText
                secondary
                style={styles.login}
                onPress={loginHandler}
                disabled={loading}
              >
                {"Вже є акаунт? Увійти"}
              </CustomText>
            </View>
            <UserPhoto
              isPhoto={!!image}
              image={image?.uri}
              onPress={
                image
                  ? () => {
                      setImage(null);
                    }
                  : getImageHandler
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
});

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
