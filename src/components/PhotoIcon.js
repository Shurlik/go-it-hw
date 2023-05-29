import React from "react";
import { StyleSheet } from "react-native";
import PressButton from "./PressButton";

import { FontAwesome } from "@expo/vector-icons";
import Colors from "../assets/Colors";

const PhotoIcon = ({ onPress, secondary }) => {
  return (
    <PressButton
      style={[styles.container, secondary && styles.secondary]}
      {...{ onPress }}
    >
      <FontAwesome
        name="camera"
        size={24}
        color={secondary ? Colors.white : Colors.darkGrey}
      />
    </PressButton>
  );
};
export default PhotoIcon;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  secondary: {
    backgroundColor: Colors.opacityWhite,
  },
});
