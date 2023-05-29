import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../assets/Colors";

const BackButton = ({ style }) => {
  const navigation = useNavigation();
  const BackHandler = () => {
    const canBack = navigation.canGoBack();
    if (canBack) {
      navigation.goBack();
    } else {
      navigation.navigate("tabs");
    }
  };

  return (
    <Feather
      name="arrow-left"
      size={24}
      color={Colors.black}
      style={[styles.back, style && style]}
      onPress={BackHandler}
    />
  );
};
export default BackButton;

const styles = StyleSheet.create({
  back: {
    marginLeft: 16,
    fontWeight: "normal",
  },
});
