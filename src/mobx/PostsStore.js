import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class PostsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {
      name: "PostsStore",
      properties: ["posts"],
      storage: AsyncStorage,
    });
  }

  posts = [];

  setPosts(posts) {
    this.posts = posts;
  }

  clearPosts() {
    this.posts = [];
  }
}
