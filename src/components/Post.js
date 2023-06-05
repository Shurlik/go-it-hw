import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import CustomText from "./typography/CustomText";
import { Feather } from "@expo/vector-icons";
import Colors from "../assets/Colors";
import { useNavigation } from "@react-navigation/native";
import PostIcons from "./PostIcons";
import { useSelector } from "react-redux";
import { useFirebase } from "../hooks/useFirebase";

const Post = ({
  postTitle,
  postPlaceDescription,
  postCoordinates,
  imageUrl,
  id,
  likes,
  commentsCount,
}) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.user);
  const { firebaseUpdateData } = useFirebase();

  const commentsHandler = () => {
    navigation.navigate("comments", { postId: id });
  };

  const locationHandler = () => {
    navigation.navigate("map", {
      postCoordinates,
      postTitle,
      postPlaceDescription,
    });
  };

  const likesHandler = async () => {
    const itemIndex = likes.indexOf(user.uid);
    let newArray = [...likes];
    if (itemIndex !== -1) {
      newArray.splice(itemIndex, 1);
    } else {
      newArray.push(user.uid);
    }
    await firebaseUpdateData(id, { likes: newArray });
  };

  return (
    <View style={styles.container}>
      <View style={styles.postImage}>
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
          resizeMode={"cover"}
        />
      </View>
      <CustomText style={styles.title}>{postTitle || ""}</CustomText>
      <View style={styles.bottom}>
        <PostIcons onPress={commentsHandler} count={commentsCount} />
        <PostIcons
          onPress={likesHandler}
          count={likes?.length}
          type={"likes"}
          style={styles.likes}
        />
        <View style={styles.divider} />
        <PostIcons onPress={locationHandler} location={postPlaceDescription} />
      </View>
    </View>
  );
};
export default Post;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: Colors.white,
    width: "100%",
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: -0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    paddingBottom: 10,
  },
  postImage: {
    borderRadius: 12,
    height: 240,
    overflow: "hidden",
  },
  bottom: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 8,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  divider: {
    flexGrow: 1,
  },
  title: {
    paddingLeft: 8,
    fontWeight: "bold",
    marginTop: 8,
  },
  likes: {
    marginLeft: 25,
  },
});
