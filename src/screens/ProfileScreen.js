import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../assets/Colors";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Posts from "../components/Posts";
import UserProfileData from "../components/UserProfileData";

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const { top: tHeight } = useSafeAreaInsets();

  const userPosts = posts.filter((post) => post?.owner?.uid === user?.uid);

  return (
    <Posts
      style={styles.content}
      posts={userPosts}
      containerStyle={[styles.list, { marginTop: 200 + tHeight, paddingBottom: 250 + tHeight  }]}
      ListHeaderComponent={() => <UserProfileData {...{ user }} />}
    />
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: Colors.transparent,
  },
  list: {
    flexGrow: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 110,
    paddingTop: 150,
  },
});
