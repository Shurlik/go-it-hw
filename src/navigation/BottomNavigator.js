import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Colors from "../assets/Colors";
import { View, StyleSheet, Pressable } from "react-native";

const BottomNavigator = () => {
  const TabsNavigator = createBottomTabNavigator();
  const { top: tHeight } = useSafeAreaInsets();
  const exitHandler = () => {};

  const screenOptions = {
    tabBarActiveTintColor: Colors.white,
    tabBarInactiveTintColor: Colors.darkGrey,
    tabBarShowLabel: false,
    headerTitleAlign: "center",
    headerTitleContainerStyle: {
      paddingTop: tHeight,
    },
    headerStyle: {
      height: 50 + tHeight,
      elevation: 1,
      shadowOpacity: 1,
      borderBottomWidth: 1,
    },
    tabBarStyle: {
      paddingHorizontal: 70,
      height: 100,
    },
  };

  return (
    <TabsNavigator.Navigator screenOptions={() => screenOptions}>
      <TabsNavigator.Screen
        name={"posts"}
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => {
            return (
              <Pressable
                style={({ pressed }) => [
                  styles.exit,
                  { paddingTop: tHeight },
                  pressed && styles.pressed,
                ]}
                onPress={exitHandler}
              >
                <Ionicons
                  name="ios-exit-outline"
                  size={32}
                  color={Colors.darkGrey}
                />
              </Pressable>
            );
          },
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.button, focused ? styles.active : styles.inactive]}
            >
              <AntDesign name="appstore-o" size={20} color={color} />
            </View>
          ),
        }}
      />
      <TabsNavigator.Screen
        name={"create"}
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.button, focused ? styles.active : styles.inactive]}
            >
              <AntDesign name="plus" size={20} color={color} />
            </View>
          ),
        }}
      />
      <TabsNavigator.Screen
        name={"profile"}
        component={ProfileScreen}
        options={{
          title: "Користувач",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.button, focused ? styles.active : styles.inactive]}
            >
              <Feather name="user" size={20} color={color} />
            </View>
          ),
        }}
      />
    </TabsNavigator.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 32,
  },
  active: {
    backgroundColor: Colors.orange,
  },
  inactive: {
    backgroundColor: Colors.transparent,
  },
  pressed: {
    opacity: 0.5,
  },
  exit: {
    marginRight: 20,
  },
});
