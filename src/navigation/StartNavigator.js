import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

const StartNavigator = () => {
  const StartStackNavigator = createStackNavigator();

  return (
    <StartStackNavigator.Navigator>
      <StartStackNavigator.Screen
        name={"login"}
        component={LoginScreen}
        options={{
          header: () => false,
        }}
      />
      <StartStackNavigator.Screen
        name={"register"}
        component={RegistrationScreen}
        options={{
          header: () => false,
        }}
      />
    </StartStackNavigator.Navigator>
  );
};
export default StartNavigator;
