import React from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomText from "./typography/CustomText";
import Colors from "../assets/Colors";
// import { useSelector } from "react-redux";
import store from "../mobx";
import {observer} from "mobx-react-lite";

const User = observer(() => {
  const { user } = store.user;
  // const { user } = useSelector((state) => state.user);
  return (
    <View style={styles.container}>
      <View style={styles.userPhoto}>
        <Image
          style={styles.image}
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require("../assets/def.png")
          }
          resizeMode={"cover"}
        />
      </View>
      <View style={styles.textContent}>
        <CustomText style={styles.name}>{user?.displayName}</CustomText>
        <CustomText style={styles.email}>{user?.email}</CustomText>
      </View>
    </View>
  );
});
export default User;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    overflow: "hidden",
    width: 120,
    height: 120,
    backgroundColor: Colors.lightGrey,
    borderRadius: 16,
  },
  image: {
    width: "100%",
    flex: 1,
  },
  textContent: {
    marginLeft: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20
  },
  email: {},
});
