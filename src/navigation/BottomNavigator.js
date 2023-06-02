import React, { useEffect, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Colors from "../assets/Colors";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import ExitButton from "../components/ExitButton";
import { useFirebase } from "../hooks/useFirebase";
import BackButton from "../components/BackButton";

const BottomNavigator = () => {
  const TabsNavigator = createBottomTabNavigator();
  const { top: tHeight } = useSafeAreaInsets();
  const { firebaseFetchData } = useFirebase();
  const [loading, setLoading] = useState(false);

  const starter = async () => {
    setLoading(true);
    await firebaseFetchData();
    setLoading(false);
  };

  useEffect(() => {
    starter();
  }, []);

  const screenOptions = {
    tabBarHideOnKeyboard: true,
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={Colors.darkGrey} size={"large"} />
      </View>
    );
  }

  return (
    <TabsNavigator.Navigator screenOptions={() => screenOptions}>
      <TabsNavigator.Screen
        name={"posts"}
        component={PostsScreen}
        options={{
          animationTypeForReplace: "pop",
          title: "Публікації",
          headerRight: () => {
            return (
              <ExitButton style={{ paddingTop: tHeight, marginRight: 20 }} />
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
          unmountOnBlur: true,
          tabBarStyle: { display: "none" },
          headerLeft: () => <BackButton style={{ paddingTop: tHeight }} />,
        }}
      />
      <TabsNavigator.Screen
        name={"profile"}
        component={ProfileScreen}
        options={{
          animationTypeForReplace: "push",
          header: () => false,
          title: "Користувач",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.button, focused ? styles.active : styles.inactive]}
            >
              <Feather name="user" size={20} color={color} />
            </View>
          ),
          unmountOnBlur: true,
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
  exit: {
    marginRight: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
