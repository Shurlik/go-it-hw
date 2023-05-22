import { StyleSheet, Text } from "react-native";
import React from "react";

import Colors from "../../assets/Colors";

const TitleText = ({ text, titleType }) => {
    return (
        <Text
            style={[
                styles.titel,
                titleType === "h1" && styles.h1,
                titleType === "h2" && styles.h2,
            ]}
        >
            {text}
        </Text>
    );
};

export default TitleText;

const styles = StyleSheet.create({
    titel: {
        color: Colors.black,
        fontWeight: "bold",
    },
    h1: {
        fontSize: 30
    },
    h2: {
        fontSize: 25
    },
});
