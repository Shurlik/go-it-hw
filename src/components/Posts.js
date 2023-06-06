import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Post from "./Post";
import Colors from "../assets/Colors";
import { useScrollToTop } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

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
    <View
      style={[styles.container, style && style]}
      removeClippedSubviews={false}
    >
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={[styles.content, containerStyle && containerStyle]}>
          <ListHeaderComponent />
          {posts.map((item, index) => (
            <Post
              key={index.toString()}
              postCoordinates={item.postCoordinates}
              postTitle={item.postTitle}
              imageUrl={item.photoLink}
              postPlaceDescription={item.postPlaceDescription}
              id={item.id}
              likes={item.likes}
              commentsCount={item.comments?.length}
            />
          ))}
        </View>
      </ScrollView>
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
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
});
