import { TextInput, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import Colors from "../assets/Colors";
import CustomText from "./typography/CustomText";

const CustomTextInput = ({
    isActive,
    onBlur,
    onFocus,
    onChangeText,
    value,
    editable,
    placeholder,
    style,
    isPassword,
}) => {
    const [secure, setSecure] = useState(isPassword ? true : false);
    const showPassword = () => setSecure((oldValue) => !oldValue);

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    isActive && styles.active,
                    style && style,
                ]}
                autoCapitalize={"none"}
                secureTextEntry={secure}
                {...{
                    onBlur,
                    onFocus,
                    onChangeText,
                    value,
                    editable,
                    placeholder,
                }}
            />
            {isPassword ? (
                <CustomText
                    secondary
                    onPress={showPassword}
                    style={styles.text}
                >
                    {secure ? "Показать" : "Скрыть"}
                </CustomText>
            ) : null}
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
    },
    input: {
        backgroundColor: Colors.lightGrey,
        height: 50,
        borderRadius: 8,
        borderColor: Colors.grey,
        borderWidth: 1,
        paddingHorizontal: 16,
        fontSize: 18,
        marginVertical: 8,
        fontWeight: "normal",
    },
    active: {
        backgroundColor: Colors.white,
        borderColor: Colors.orange,
    },
    text: {
        position: "absolute",
        right: 16,
    },
});
