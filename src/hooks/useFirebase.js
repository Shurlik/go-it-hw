import React from 'react';
// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
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
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { setPosts } from "../store/posts/posts.slices";

import {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} from "@env";

console.log(process.env);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export function useFirebase() {
  const auth = getAuth(app);
  const storage = getStorage();
  const dispatch = useDispatch();

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
      const response = await uploadBytes(imageRef, blob);
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
      // await db.collection('posts').doc(postId).update(data);
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
  };
}
