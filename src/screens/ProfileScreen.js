import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../assets/Colors";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen Screen</Text>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
