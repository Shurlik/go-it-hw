import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "./typography/CustomText";
import Colors from "../assets/Colors";

const Error = ({ isError, errorMessage, style, textStyle }) => {
  return isError ? (
    <View style={[styles.container, style && style]}>
      <CustomText style={[styles.message, textStyle && textStyle]}>
        {errorMessage}
      </CustomText>
    </View>
  ) : null;
};
export default Error;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: '100%',
    marginTop: -10
  },
  message: {
    color: Colors.error,
  },
});
