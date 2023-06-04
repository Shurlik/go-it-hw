import React from "react";
import { StyleSheet } from "react-native";
import PressButton from "./PressButton";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../assets/Colors";
// import { useDispatch } from "react-redux";
import { useFirebase } from "../hooks/useFirebase";
// import { logout } from "../store/user/user.slices";
// import { clearPosts } from "../store/posts/posts.slices";
import store from "../mobx";
import {observer} from "mobx-react-lite";

const ExitButton = observer(({ style }) => {
  // const dispatch = useDispatch();
  const {logout} = store.user
  const {clearPosts} = store.posts
  const { firebaseLogout } = useFirebase();
  const exitHandler = async () => {
    try {
      await firebaseLogout();
      // dispatch(logout());
      // dispatch(clearPosts());
      logout();
      clearPosts();
    } catch (e) {
      console.log("exitHandler error: ", e);
    }
  };

  return (
    <PressButton style={[styles.exit, style && style]} onPress={exitHandler}>
      <Ionicons name="ios-exit-outline" size={32} color={Colors.darkGrey} />
    </PressButton>
  );
});
export default ExitButton;

const styles = StyleSheet.create({
  exit: {},
});
