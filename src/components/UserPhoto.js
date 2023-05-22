import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { EvilIcons } from "@expo/vector-icons";

import Colors from "../assets/Colors";

const UserPhoto = ({ isPhoto }) => {
    return (
        <View style={styles.container}>
            <EvilIcons
                name={isPhoto ? "close-o" : "plus"}
                size={36}
                color={isPhoto ? Colors.darkGrey : Colors.orange}
                style={styles.icons}
            />
        </View>
    );
};

export default UserPhoto;

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        backgroundColor: Colors.lightGrey,
        borderRadius: 10,
        position: "absolute",
        top: -60,
    },
    icons: {
        position: 'absolute',
        right: -16,
        bottom: 14
    },
});
