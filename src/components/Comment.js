import React from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomText from "./typography/CustomText";
import Colors from "../assets/Colors";
import { COMMENT_TIME_FORMAT } from "../assets/patterns";
import moment from "moment";

const Comment = ({ text, time, userPhoto, isOwner }) => {
  return (
    <View style={styles.container}>
      {!isOwner && (
        <View style={styles.userImage}>
          <Image
            source={
              userPhoto ? { uri: userPhoto } : require("../assets/def.png")
            }
            style={styles.image}
            resizeMode={"cover"}
          />
        </View>
      )}
      <View style={[styles.content, isOwner && styles.reverseContent]}>
        <CustomText style={styles.comment}>{text}</CustomText>
        <CustomText
          style={[styles.timestamp, isOwner && styles.reverseTimestamp]}
        >
          {moment(time).format(COMMENT_TIME_FORMAT)}
        </CustomText>
      </View>
      {isOwner && (
        <View style={styles.userImage}>
          <Image
            source={
              userPhoto ? { uri: userPhoto } : require("../assets/def.png")
            }
            style={styles.image}
            resizeMode={"cover"}
          />
        </View>
      )}
    </View>
  );
};
export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 24,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: Colors.grey,
    overflow: "hidden"
  },

  image: {
    width: "100%",
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    backgroundColor: Colors.grey,
    flexGrow: 1,
    padding: 16,
    marginLeft: 16,
    flexShrink: 1,

    borderRadius: 6,
    borderTopLeftRadius: 0,
  },
  reverseContent: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
    marginLeft: 0,
    marginRight: 16,
  },
  comment: {},
  timestamp: {
    color: Colors.darkGrey,
    fontSize: 12,
    marginTop: 8,
    textAlign: "right",
  },
  reverseTimestamp: {
    textAlign: "left",
  },
});
