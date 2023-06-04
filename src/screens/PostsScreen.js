import React, { useRef } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../assets/Colors";
import Post from "../components/Post";
// import { useSelector } from "react-redux";
import User from "../components/User";
import { useScrollToTop } from "@react-navigation/native";
import store from "../mobx";
import {observer} from "mobx-react-lite";


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

const PostsScreen = observer(() => {
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  const { posts } = store.posts;
  // const { posts } = useSelector((state) => state.posts);
  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        ListHeaderComponent={User}
        style={styles.scroll}
        data={posts}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
    </View>
  );
});
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
