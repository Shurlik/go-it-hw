import React from "react";
// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp, getApps, getApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { setPosts } from "../store/posts/posts.slices";
import { logout } from "../store/user/user.slices";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL:
    "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// const app = initializeApp(firebaseConfig);
let app;
let auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

export function useFirebase() {
  const storage = getStorage();
  const dispatch = useDispatch();

  const firebaseUpdateUserPhoto = async (photoURL) => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL,
      });
      return auth.currentUser;
    } catch (e) {
      console.log("firebaseUpdateUserPhoto error: ", e);
    }
  };

  const firebaseSignUp = async ({
    email,
    password,
    login,
    photoURL = null,
  }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: photoURL,
      });
      return auth.currentUser;
    } catch (e) {
      console.log("firebaseSignUp error: ", e);
      if (e.toString().includes("email-already-in-use")) {
        throw new Error("Користувач з такою адресою вже існує");
      }
      throw e;
    }
  };

  const firebaseLogin = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return auth.currentUser;
    } catch (e) {
      console.log("firebaseLogin error: ", e);
      if (
        e.toString().includes("invalid-email") ||
        e.toString().includes("user-not-found") ||
        e.toString().includes("wrong-password")
      ) {
        throw new Error("Перевірте Ваш логін та/або пароль");
      }
      throw e;
    }
  };

  const firebaseLogout = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.log("firebaseLogout error: ", e);
    }
  };

  const firebaseFileUpload = async (imageUri, imageName) => {
    if (!imageUri) {
      return;
    }
    try {
      const res = await fetch(imageUri);
      const blob = await res.blob();
      const imageRef = storageRef(storage, `${v4()}-${imageName}`); // getting image ref
      // 'file' comes from the Blob or File API
      const response = await uploadBytesResumable(imageRef, blob); //uploadBytes() crashed app
      return await getDownloadURL(response.ref); // getting link
    } catch (e) {
      console.log("firebaseFileUpload error: ", e);
      throw e;
    }
  };

  const firebaseUploadData = async (data) => {
    const db = getFirestore(app);
    try {
      await addDoc(collection(db, "posts"), data);
      await firebaseFetchData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const firebaseFetchData = async () => {
    const db = getFirestore(app);

    try {
      await getDocs(collection(db, "posts")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(setPosts(newData));
      });
    } catch (e) {
      console.log("firebaseFetchData error: ", e);
    }
  };

  const firebaseUpdateData = async (postId, data) => {
    const db = getFirestore(app);

    try {
      await updateDoc(doc(db, "posts", postId), data);
      await firebaseFetchData();
    } catch (e) {
      console.log("firebaseUpdateData error: ", e);
    }
  };

  return {
    firebaseSignUp,
    firebaseLogin,
    firebaseLogout,
    firebaseFileUpload,
    firebaseUploadData,
    firebaseFetchData,
    firebaseUpdateData,
    firebaseUpdateUserPhoto,
  };
}
