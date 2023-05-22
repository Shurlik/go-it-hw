import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Colors from "../../assets/Colors";

const CustomText = ({ children, onPress, style, secondary }) => {
    return (
        <Text
            style={[styles.text, secondary && styles.secondary, style && style]}
            onPress={onPress}
        >
            {children}
        </Text>
    );
};

export default CustomText;

const styles = StyleSheet.create({
    text: {
        color: Colors.black,
        fontSize: 16
    },
    secondary: {
        color: Colors.textSecondary,
    },
});
