import React from "react";
import { Pressable, StyleSheet } from "react-native";

const PressButton = ({ children, onPress, style, disabled }) => {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, style && style]}
      {...{ onPress, disabled }}
    >
      {children}
    </Pressable>
  );
};
export default PressButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});
