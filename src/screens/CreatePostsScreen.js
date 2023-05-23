import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../assets/Colors";

const CreatePostsScreen = () => {
    return (
        <View style={styles.container}>
        <Text>CreatePostsScreen Screen</Text>
        </View>
    );
};
export default CreatePostsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,

    },
});
