import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import StartNavigator from "./StartNavigator";
import BottomNavigator from "./BottomNavigator";
import CommentsScreen from "../screens/CommentsScreen";
import BackButton from "../components/BackButton";
import MapScreen from "../screens/MapScreen";

const RootNavigator = () => {
  const RootStackNavigator = createStackNavigator();
  const headerStyle = {
    elevation: 1,
    shadowOpacity: 1,
    borderBottomWidth: 1,
  };
  return (
    <RootStackNavigator.Navigator
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <RootStackNavigator.Screen
        name={"start"}
        component={StartNavigator}
        options={{
          header: () => false,
        }}
      />
      <RootStackNavigator.Screen
        name={"tabs"}
        component={BottomNavigator}
        options={{
          header: () => false,
        }}
      />
      <RootStackNavigator.Screen
        name={"comments"}
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerLeft: () => <BackButton />,
          headerStyle: headerStyle,
        }}
      />
      <RootStackNavigator.Screen
        name={"map"}
        component={MapScreen}
        options={{
          title: "Мапа",
          headerLeft: () => <BackButton />,
          headerStyle: headerStyle,
        }}
      />
    </RootStackNavigator.Navigator>
  );
};
export default RootNavigator;
