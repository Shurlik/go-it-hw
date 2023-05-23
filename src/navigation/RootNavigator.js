import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import StartNavigator from "./StartNavigator";
import BottomNavigator from "./BottomNavigator";

const RootNavigator = () => {
  const RootStackNavigator = createStackNavigator();
  return (
    <RootStackNavigator.Navigator>
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
    </RootStackNavigator.Navigator>
  );
};
export default RootNavigator;
