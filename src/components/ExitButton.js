import React from "react";
import { StyleSheet } from "react-native";
import PressButton from "./PressButton";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../assets/Colors";
import { logout } from "../store/user/user.slices";
import { useDispatch } from "react-redux";
import { useFirebase } from "../hooks/useFirebase";
import { clearPosts } from "../store/posts/posts.slices";

const ExitButton = ({ style }) => {
  const dispatch = useDispatch();
  const { firebaseLogout } = useFirebase();
  const exitHandler = async () => {
    try {
      await firebaseLogout();
      dispatch(logout());
      dispatch(clearPosts());
    } catch (e) {
      console.log("exitHandler error: ", e);
    }
  };

  return (
    <PressButton style={[styles.exit, style && style]} onPress={exitHandler}>
      <Ionicons name="ios-exit-outline" size={32} color={Colors.darkGrey} />
    </PressButton>
  );
};
export default ExitButton;

const styles = StyleSheet.create({
  exit: {},
});
