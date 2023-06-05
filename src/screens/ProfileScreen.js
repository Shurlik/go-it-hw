import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Colors from "../assets/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Posts from "../components/Posts";
import UserProfileData from "../components/UserProfileData";
import { useImage } from "../hooks/useImage";
import { useFirebase } from "../hooks/useFirebase";
import ModalLoader from "../components/ModalLoader";
import { setUser } from "../store/user/user.slices";

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const { top: tHeight } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const userPosts = posts.filter((post) => post?.owner?.uid === user?.uid);

  const { getImage } = useImage();
  const { firebaseFileUpload, firebaseUpdateUserPhoto } = useFirebase();
  const dispatch = useDispatch();

  const photoChangeHandler = async () => {
    setLoading(true);
    try {
      const imageObject = await getImage();
      if (imageObject) {
        const imageURL = await firebaseFileUpload(
          imageObject.uri,
          imageObject.fileName
        );
        const { displayName, email, photoURL, uid } = await firebaseUpdateUserPhoto(imageURL);
        dispatch(setUser({ displayName, email, photoURL, uid }));
      } else {
        console.log("photoChangeHandler: No Image");
        setLoading(false);
        return;
      }
    } catch (e) {
      console.log("photoChangeHandler error: ", e);
    }
    setLoading(false);
  };

  return (
    <>
      <Posts
        style={styles.content}
        posts={userPosts}
        containerStyle={[
          styles.list,
          { marginTop: 200 + tHeight, paddingBottom: 250 + tHeight },
        ]}
        ListHeaderComponent={() => (
          <UserProfileData onPress={photoChangeHandler} {...{ user }} />
        )}
      />
      <ModalLoader isVisible={loading} />
    </>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: Colors.transparent,
  },
  list: {
    flexGrow: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 110,
    paddingTop: 150,
  },
});
