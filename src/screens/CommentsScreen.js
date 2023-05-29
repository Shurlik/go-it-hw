import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../assets/Colors";

const CommentsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>CommentsScreen Screen</Text>
        </View>
    );
};
export default CommentsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white
    },
});
