import { ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

import Colors from "../assets/Colors";
import CustomText from "./typography/CustomText";
import PressButton from "./PressButton";

const CustomButton = ({
  title,
  onPress,
  secondary,
  style,
  disabled,
  loading,
}) => {
  return (
    <PressButton
      style={[
        styles.container,
        secondary && styles.secondary,
        style && style,
        disabled && styles.disabled,
      ]}
      {...{ onPress, disabled }}
    >
      {loading ? (
        <ActivityIndicator size={"small"} color={Colors.textSecondary} />
      ) : (
        <CustomText
          style={[
            styles.title,
            secondary && styles.titleSecondary,
            disabled && styles.textDisables,
          ]}
        >
          {title}
        </CustomText>
      )}
    </PressButton>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.orange,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  secondary: {
    backgroundColor: Colors.transparent,
  },
  title: {
    color: Colors.white,
  },
  titleSecondary: {
    color: Colors.textSecondary,
  },
  disabled: {
    backgroundColor: Colors.grey,
  },
  textDisables: {
    color: Colors.darkGrey,
  },
});
