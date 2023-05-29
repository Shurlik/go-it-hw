import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../assets/Colors";
import Post from "../components/Post";
import { useSelector } from "react-redux";

const renderItem = ({ item }) => {
  return (
    <Post
      postCoordinates={item.postCoordinates}
      postTitle={item.postTitle}
      imageUrl={item.uri}
      postPlaceDescription={item.postPlaceDescription}
    />
  );
};

const PostsScreen = () => {
  const { posts } = useSelector((state) => state.posts);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.scroll}
        data={posts}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};
export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  scroll: {
    width: "100%",
  },
  content: {
    paddingHorizontal: 16,
  },
});
