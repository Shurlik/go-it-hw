import React, { useRef } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Post from "./Post";
import Colors from "../assets/Colors";
import { useScrollToTop } from "@react-navigation/native";

const renderItem = ({ item }) => {
  return (
    <Post
      postCoordinates={item.postCoordinates}
      postTitle={item.postTitle}
      imageUrl={item.photoLink}
      postPlaceDescription={item.postPlaceDescription}
      id={item.id}
      likesCount={item.likes?.length}
      commentsCount={item.comments?.length}
    />
  );
};

const Posts = ({ posts, ListHeaderComponent, style, containerStyle }) => {
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  return (
    <View style={[styles.container, style && style]}>
      <FlatList
        bounces={false}
        ref={scrollRef}
        ListHeaderComponent={ListHeaderComponent}
        style={styles.scroll}
        data={posts}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          containerStyle && containerStyle,
        ]}
      />
    </View>
  );
};
export default Posts;

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
    flexGrow: 1
  },
});
