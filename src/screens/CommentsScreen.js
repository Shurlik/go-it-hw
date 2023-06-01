import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../assets/Colors";
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";
import { useSelector } from "react-redux";
import CustomText from "../components/typography/CustomText";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;

  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);
  const currentPost = posts.find((post) => post.id === postId);

  const renderItem = ({ item }) => (
    <Comment
      isOwner={item.owner?.uid === user.uid}
      userPhoto={item.owner?.photoURL}
      text={item.text}
      time={item.timestamp}
    />
  );

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
        style={styles.content}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.comments}
          style={styles.list}
          data={currentPost.comments}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: currentPost.photoLink }}
                style={styles.image}
                resizeMode={"cover"}
              />
            </View>
          }
        />
        {currentPost.comments.length < 1 && (
          <CustomText style={styles.noComments}>Коментарів ще нема</CustomText>
        )}
        <CommentInput comments={currentPost.comments} {...{ user, postId }} />
      </KeyboardAvoidingView>
    </View>
  );
};
export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  imageContainer: {
    borderRadius: 12,
    height: 240,
    overflow: "hidden",
    width: "100%",
    marginTop: 32,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  list: {
    width: "100%",
    flex: 1,
  },
  content: { width: "100%", flex: 1 },
  comments: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  noComments: {
    color: Colors.darkGrey,
    textAlign: "center",
  }
});
