import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../assets/Colors";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const { postCoordinates, postTitle, postPlaceDescription } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitudeDelta: 0.4,
          longitudeDelta: 0.8,
          ...postCoordinates,
        }}
      >
        <Marker
          coordinate={postCoordinates}
          title={postTitle}
          description={postPlaceDescription}
        />
      </MapView>
    </View>
  );
};
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
