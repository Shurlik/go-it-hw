import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import StartNavigator from "./StartNavigator";
import BottomNavigator from "./BottomNavigator";
import CommentsScreen from "../screens/CommentsScreen";
import BackButton from "../components/BackButton";
import MapScreen from "../screens/MapScreen";
// import { useSelector } from "react-redux";
import store from "../mobx";
import {observer} from "mobx-react-lite";

const RootNavigator = observer(() => {
  const RootStackNavigator = createStackNavigator();
  const headerStyle = {
    elevation: 1,
    shadowOpacity: 1,
    borderBottomWidth: 1,
  };

  // const { tokens } = useSelector((state) => {
  //   return state.user;
  // });
  const { tokens } = store.user;

  return (
    <RootStackNavigator.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      {!!tokens ? (
        <>
          <RootStackNavigator.Screen
            name={"tabs"}
            component={BottomNavigator}
            options={{
              header: () => false,
              gestureEnabled: false,
              gestureDirection: "vertical",
              animationTypeForReplace: "push",
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
        </>
      ) : (
        <>
          <RootStackNavigator.Screen
            name={"start"}
            component={StartNavigator}
            options={{
              header: () => false,
            }}
          />
        </>
      )}
    </RootStackNavigator.Navigator>
  );
});
export default RootNavigator;
