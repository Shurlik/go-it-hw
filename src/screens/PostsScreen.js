import React, { useRef } from "react";
import { useSelector } from "react-redux";
import User from "../components/User";
import { useScrollToTop } from "@react-navigation/native";
import Posts from "../components/Posts";

const PostsScreen = () => {
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  const { posts } = useSelector((state) => state.posts);

  return <Posts posts={posts} ListHeaderComponent={User} />;
};
export default PostsScreen;
