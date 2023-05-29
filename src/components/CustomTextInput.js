import { TextInput, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import Colors from "../assets/Colors";
import CustomText from "./typography/CustomText";
import { Feather } from "@expo/vector-icons";

const CustomTextInput = ({
  isActive,
  onBlur,
  onFocus,
  onChangeText,
  value,
  editable,
  placeholder,
  style,
  isPassword,
  keyboardType,
  underline,
  geo,
}) => {
  const [secure, setSecure] = useState(!!isPassword);
  const showPassword = () => setSecure((oldValue) => !oldValue);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          isActive && styles.active,
          style && style,
          underline && styles.underline,
          geo && styles.geo,
        ]}
        autoCapitalize={"none"}
        secureTextEntry={secure}
        {...{
          onBlur,
          onFocus,
          onChangeText,
          value,
          editable,
          placeholder,
          keyboardType,
        }}
      />
      {isPassword ? (
        <CustomText secondary onPress={showPassword} style={styles.text}>
          {secure ? "Показати" : "Сховати"}
        </CustomText>
      ) : null}
      {geo ? (
        <Feather
          name="map-pin"
          size={24}
          color={Colors.darkGrey}
          style={styles.point}
        />
      ) : null}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  input: {
    backgroundColor: Colors.lightGrey,
    height: 50,
    borderRadius: 8,
    borderColor: Colors.grey,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 18,
    marginVertical: 8,
    fontWeight: "normal",
  },
  active: {
    backgroundColor: Colors.white,
    borderColor: Colors.orange,
  },
  text: {
    position: "absolute",
    right: 16,
  },
  underline: {
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    backgroundColor: Colors.transparent,
    marginTop: 30,
  },
  geo: {
    paddingLeft: 35,
  },
  point: {
    position: "absolute",
    bottom: 20
  },
});
