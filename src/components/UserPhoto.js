import { Image, StyleSheet, View } from "react-native";
import React from "react";

import { EvilIcons } from "@expo/vector-icons";

import Colors from "../assets/Colors";

const UserPhoto = ({ isPhoto, image, onPress, profile, style }) => {
  return (
    <View style={[styles.container, style && style]}>
      <View style={styles.imageContainer}>
        <Image
          source={image ? { uri: image } : require("../assets/def.png")}
          style={styles.image}
          resizeMode={"cover"}
        />
      </View>
      {!profile && (
        <EvilIcons
          name={isPhoto ? "close-o" : "plus"}
          size={36}
          color={isPhoto ? Colors.darkGrey : Colors.orange}
          style={styles.icons}
          onPress={onPress}
        />
      )}
    </View>
  );
};

export default UserPhoto;

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    position: "absolute",
    top: -60,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    borderRadius: 10,
  },
  icons: {
    position: "absolute",
    right: -16,
    bottom: 14,
  },
  image: {
    width: "100%",
    flex: 1,
  },
});
