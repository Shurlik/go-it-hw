import { makeAutoObservable } from "mobx";

import UserStore from "./UserStore";
import PostsStore from "./PostsStore";

class RootStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

  }

  user = new UserStore();
  posts = new PostsStore();
}

export default new RootStore();
