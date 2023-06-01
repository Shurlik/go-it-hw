import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import UpArrow from "./UpArrow";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "./CustomTextInput";
import { useFirebase } from "../hooks/useFirebase";

const CommentInput = ({ user, postId, comments }) => {
  const [comment, setComment] = useState("");
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const { firebaseUpdateData, firebaseFetchData } = useFirebase();

  const pressHandler = async () => {
    setLoading(true);

    try {
      const newComment = {
        text: comment,
        timestamp: new Date().getTime(),
        owner: {
          photoURL: user.photoURL,
          uid: user.uid,
        },
      };
      const newCommentsArray = [...comments, newComment];
      await firebaseUpdateData(postId, { comments: newCommentsArray });
      setComment("");
      await firebaseFetchData();
    } catch (e) {
      console.log("CommentInput error: ", e);
    }
    setLoading(false);
  };

  return (
    <>
      <View style={styles.container}>
        <CustomTextInput
          style={styles.input}
          placeholder={"Коментувати..."}
          onChangeText={(text) => {
            setComment(text);
          }}
          isActive={active}
          value={comment}
          onBlur={() => {
            setActive(false);
          }}
          onFocus={() => {
            setActive(true);
          }}
          editable={!loading}
        />
        <UpArrow onPress={pressHandler} loading={loading} />
      </View>
      <SafeAreaView edges={["top"]} />
    </>
  );
};
export default CommentInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
  },
  input: {
    borderRadius: 100,
  },
});
