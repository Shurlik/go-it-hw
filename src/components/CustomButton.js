import { Pressable, StyleSheet } from "react-native";
import React from "react";

import Colors from "../assets/Colors";
import CustomText from "./typography/CustomText";

const CustomButton = ({ title, onPress, secondary, style }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        secondary && styles.secondary,
        styles && styles,
        pressed && styles.pressed,
      ]}
      {...{ onPress }}
    >
      <CustomText style={[styles.title, secondary && styles.titleSecondary]}>
        {title}
      </CustomText>
    </Pressable>
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
  pressed: {
    opacity: 0.5,
  },
});
