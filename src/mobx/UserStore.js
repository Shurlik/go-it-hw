import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default class UserStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {name: 'UserStore', properties:['user', 'tokens'], storage: AsyncStorage })
  }

  user = null; //{displayName, email, photoUR, uid}
  tokens = null; //{accessToken, refreshToken}

  setUser(user) {
    this.user = user;
  }

  setTokens(tokens) {
    this.tokens = [tokens];
  }

  logout() {
    this.user = null;
    this.tokens = null;
  }
}
