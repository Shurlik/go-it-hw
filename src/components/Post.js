import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import CustomText from "./typography/CustomText";
import { Feather } from "@expo/vector-icons";
import Colors from "../assets/Colors";
import { useNavigation } from "@react-navigation/native";

const Post = ({
  postTitle,
  postPlaceDescription,
  postCoordinates,
  imageUrl,
  id,
  likesCount,
  commentsCount,
}) => {
  const navigation = useNavigation();
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
        <Pressable style={styles.row} onPress={commentsHandler}>
          <Feather
            name="message-circle"
            size={24}
            color={commentsCount ? Colors.orange :Colors.darkGrey}
            style={styles.rotate90}
          />
          <CustomText style={styles.count}>{commentsCount}</CustomText>
        </Pressable>
        <Pressable style={styles.row} onPress={locationHandler}>
          <Feather
            name="map-pin"
            size={18}
            color={Colors.darkGrey}
            style={styles.point}
          />
          <CustomText style={styles.description}>
            {postPlaceDescription}
          </CustomText>
        </Pressable>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    color: Colors.black,
    marginLeft: 8,
    textDecorationLine: "underline",
    textDecorationColor: Colors.black,
  },

  rotate90: {
    transform: [{ scaleX: -1 }],
  },
  count: { marginLeft: 8, color: Colors.darkGrey },
  title: {
    paddingLeft: 8,
    fontWeight: "bold",
    marginTop: 8,
  },
});
