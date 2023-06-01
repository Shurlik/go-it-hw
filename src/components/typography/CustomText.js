import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Colors from "../../assets/Colors";

const CustomText = ({ children, onPress, style, secondary, disabled }) => {
  return (
    <Text
      style={[styles.text, secondary && styles.secondary, style && style]}
      onPress={!disabled ? onPress : undefined}
    >
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    color: Colors.black,
    fontSize: 16,
  },
  secondary: {
    color: Colors.textSecondary,
  },
});
