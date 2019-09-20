import { observable } from "mobx";

class AuthState {
  @observable user = null;
  @observable accessToken = null;

  clear() {
    this.user = null;
    this.accessToken = null;
  }
}

export default new AuthState();
