import React from "react";
import { StyleSheet, Pressable, ActivityIndicator } from "react-native";
import Colors from "../assets/Colors";
import { AntDesign } from "@expo/vector-icons";

const UpArrow = ({ onPress, style, loading }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        style && style,
      ]}
      {...{ onPress }}
    >
      {loading ? (
        <ActivityIndicator size={"small"} color={Colors.lightGrey} />
      ) : (
        <AntDesign name="arrowup" size={18} color={Colors.white} />
      )}
    </Pressable>
  );
};
export default UpArrow;

const styles = StyleSheet.create({
  container: {
    width: 34,
    height: 34,
    borderRadius: 100,
    backgroundColor: Colors.orange,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "flex-end",
    right: 9,
  },
  pressed: {
    opacity: 0.5,
  },
});
