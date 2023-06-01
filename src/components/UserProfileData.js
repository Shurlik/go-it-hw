import React from "react";
import { View, StyleSheet } from "react-native";
import UserPhoto from "./UserPhoto";
import TitleText from "./typography/TitleText";
import ExitButton from "./ExitButton";

const UserProfileData = ({ user }) => {
  return (
    <>
      <View style={styles.container}>
        <UserPhoto
          isPhoto={true}
          image={user?.photoURL}
          profile
          style={styles.photo}
        />
        <TitleText text={user?.displayName} titleType={"h1"} />
      </View>
      <ExitButton style={styles.exit} />
    </>
  );
};
export default UserProfileData;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    top: -210,
    position: "absolute",
    alignSelf: "center",
  },
  photo: {
    position: "relative",
    top: 0,
    marginBottom: 30,
  },
  exit: {
    position: "absolute",
    right: 0,
    top: -125
  },
});
