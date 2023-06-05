import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "../assets/Colors";

const ModalLoader = ({ isVisible }) => {
  return isVisible ? (
    <View style={styles.container}>
      <ActivityIndicator
        size={"large"}
        style={styles.indicator}
        color={Colors.orange}
      />
    </View>
  ) : null;
};
export default ModalLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.backdrop,
    zIndex: 99999,
  },
  indicator: {
    width: 200,
    height: 200,
  },
});
