import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../assets/Colors";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PostsScreen Screen</Text>
    </View>
  );
};
export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
