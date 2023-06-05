import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../assets/Colors";
import CustomText from "./typography/CustomText";

const PostIcons = ({ onPress, type, count, location, style }) => {
  let icon = "message-circle";
  let size = 24;
  if (type === "likes") {
    icon = "thumbs-up";
  }
  if (location) {
    icon = "map-pin";
    size = 18;
  }
  return (
    <Pressable style={[styles.row, style && style]} onPress={onPress}>
      <Feather
        name={icon}
        size={size}
        color={count ? Colors.orange : Colors.darkGrey}
        style={type === "likes" ? {} : styles.rotate90}
      />
      {location ? (
        <CustomText style={styles.description}>{location}</CustomText>
      ) : (
        <CustomText style={styles.count}>{count}</CustomText>
      )}
    </Pressable>
  );
};
export default PostIcons;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rotate90: {
    transform: [{ scaleX: -1 }],
  },
  count: { marginLeft: 8, color: Colors.darkGrey },
  description: {
    color: Colors.black,
    marginLeft: 8,
    textDecorationLine: "underline",
    textDecorationColor: Colors.black,
  },
});
