import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import PressButton from "./PressButton";
import Colors from "../assets/Colors";

const TrashButton = ({ onPress, active, style }) => {
  return (
    <PressButton
      style={[styles.container, active && styles.active, style && style]}
      {...{ onPress }}
    >
      <Feather
        name="trash-2"
        size={20}
        color={active ? Colors.white : Colors.darkGrey}
      />
    </PressButton>
  );
};
export default TrashButton;

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  active: {
    backgroundColor: Colors.orange,
  },
});
