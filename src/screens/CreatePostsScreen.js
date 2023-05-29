import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import Colors from "../assets/Colors";
import PhotoIcon from "../components/PhotoIcon";
import CustomText from "../components/typography/CustomText";
import CustomTextInput from "../components/CustomTextInput";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CustomButton from "../components/CustomButton";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/posts/posts.slices";

const CreatePostsScreen = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [cameraRef, setCameraRef] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [imageUrl, setImageUrl] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postPlaceDescription, setPostPlaceDescription] = useState("");
  const [postCoordinates, setPostCoordinates] = useState();
  const [activeInputName, setActiveInputName] = useState("");

  const navigation = useNavigation();

  const reset = () => {
    setImageUrl("");
    setPostTitle("");
    setActiveInputName("");
    setPostCoordinates(null);
    setPostPlaceDescription("");
  };

  const getPhotoHandler = async () => {
    try {
      const mediaPermissions = await MediaLibrary.getPermissionsAsync();
      if (!mediaPermissions.granted) {
        await MediaLibrary.requestPermissionsAsync();
      }

      if (
        mediaPermissions.status === "denied" &&
        !mediaPermissions.canAskAgain
      ) {
        Alert.alert(
          "Доступ заблоковано!",
          "Надайте доступ для зберігання фото у налаштуваннях."
        );
        return;
      }

      if (!permission.granted) {
        await requestPermission();
      }
      if (permission.status === "denied" && !permission.canAskAgain) {
        Alert.alert(
          "Доступ заблоковано!",
          "Надайте доступ до камери у налаштуваннях."
        );
        return;
      }
      if (cameraRef) {
        const { uri } = await cameraRef.takePictureAsync();
        setImageUrl(uri);
      }
    } catch (error) {
      console.log("Permissions error: ", error);
    }
  };

  const getNewPhotoHandler = async () => {
    try {
      setImageUrl("");
    } catch (e) {
      console.log("Remove image err: ", e);
    }
  };

  const getLocationHandler = async () => {
    const permissions = await Location.requestForegroundPermissionsAsync();

    if (permissions.status === "denied" && !permissions.canAskAgain) {
      Alert.alert(
        "Доступ заблоковано!",
        "Надайте доступ до геолокації у налаштуваннях."
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const longitude = JSON.stringify(location.coords.longitude);
    const latitude = JSON.stringify(location.coords.latitude);

    setPostCoordinates({
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
    });
  };

  const submitHandler = async () => {
    try {
      const asset = await MediaLibrary.createAssetAsync(imageUrl);

      await getLocationHandler();

      const newPost = {
        postTitle,
        postPlaceDescription,
        postCoordinates,
        imageUrl,
        uri: asset.uri,
      };
      const newPosts = [...posts];
      newPosts.unshift(newPost);
      dispatch(setPosts(newPosts));

      reset();
      navigation.navigate("posts");
    } catch (e) {
      console.log("new post error: ", e);
    }
  };

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.container}
      bounces={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={styles.wrapper}
      >
        <View style={styles.photo}>
          {imageUrl ? (
            <ImageBackground source={{ uri: imageUrl }} style={styles.camera}>
              <PhotoIcon onPress={getNewPhotoHandler} secondary />
            </ImageBackground>
          ) : (
            <Camera
              style={styles.camera}
              type={CameraType.back}
              ref={setCameraRef}
            >
              <PhotoIcon onPress={getPhotoHandler} />
            </Camera>
          )}
        </View>
        <CustomText style={styles.text}>
          {imageUrl ? "Редагувати фото" : "Завантажте фото"}
        </CustomText>
        <View style={styles.inputs}>
          <CustomTextInput
            placeholder={"Назва..."}
            underline
            onChangeText={(text) => {
              setPostTitle(text);
            }}
            isActive={activeInputName === "postTitle"}
            value={postTitle}
            onBlur={() => {
              setActiveInputName("");
            }}
            onFocus={() => {
              setActiveInputName("postTitle");
            }}
          />
          <CustomTextInput
            placeholder={"Місцевість..."}
            underline
            geo
            onChangeText={(text) => {
              setPostPlaceDescription(text);
            }}
            isActive={activeInputName === "postLocation"}
            value={postPlaceDescription}
            onBlur={() => {
              setActiveInputName("");
            }}
            onFocus={() => {
              setActiveInputName("postLocation");
            }}
          />
        </View>
        <CustomButton
          title={"Опублікувати"}
          onPress={submitHandler}
          style={styles.button}
          disabled={!imageUrl}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  photo: {
    backgroundColor: Colors.lightGrey,
    height: 240,
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grey,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    overflow: "hidden",
  },
  text: {
    fontSize: 12,
    alignSelf: "flex-start",
    marginTop: 5,
    color: Colors.darkGrey,
  },
  inputs: {
    width: "100%",
  },
  camera: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  button: {
    marginTop: 30,
  },
  wrapper: {
    width: "100%",
  },
  flex: { flex: 1 },
});
