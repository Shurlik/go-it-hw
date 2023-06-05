import * as ImagePicker from "expo-image-picker";

export function useImage() {
  const getImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      return {
        uri: result.assets[0].uri,
        fileName: result.assets[0].fileName,
      };
    } else {
      return null;
    }
  };
  return { getImage };
}
