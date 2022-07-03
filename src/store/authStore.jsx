import { makeAutoObservable } from "mobx";
import decode from "jwt-decode";
import profileStore from "./profileStore";

import api from "./api";
import requestStore from "./requestsStore";
class AuthStore {
  user = null;
  loading = true;
  constructor() {
    makeAutoObservable(this, {});
  }

  setUser = async (token) => {
    // await AsyncStorage.setItem("myToken", token);
    await localStorage.setItem("myToken", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
    // console.log(
    //   "🚀 ~ file: authStore.js ~ line 19 ~ AuthStore ~ setUser= ~ this.user ",
    //   this.user
    // );
  };

  checkForToken = async () => {
    // const token = await AsyncStorage.getItem("myToken");
    const token = localStorage.getItem("myToken");

    if (token) {
      const decodedToken = decode(token);
      if (Date.now() < decodedToken.exp) {
        this.setUser(token);
        this.loading = false;
      } else {
        this.signOut();
      }
    }
  };

  signIn = async (user, Swal, navigate) => {
    try {
      const resp = await api.post("/signin", user);
      await this.setUser(resp.data.token);

      this.loading = false;

      this.user.type === "admin"
        ? await requestStore.getAllRequests()
        : await profileStore.fetchProfiles();

      this.user.type === "admin"
        ? navigate("/requests")
        : navigate("/one-profile");

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You have Successfully Signed Up",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: authStore.js ~ line 47 ~ AuthStore ~ signIn= ~ error",
        error
      );

      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Enter the right data",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  signUp = async (user, Swal, navigate) => {
    try {
      const resp = await api.post("/signup", user);

      await this.setUser(resp.data.token);
      navigate("/updateProfiles");
      Swal.fire("Good job!", "You clicked the button!", "success");
    } catch (error) {
      console.log(
        "🚀 ~ file: authStore.js ~ line 57 ~ AuthStore ~ signUp= ~ error",
        error
      );
      Swal.fire(
        "You have Entered wrong info!",
        "You clicked the button!",
        "error"
      );
    }
  };

  signOut = (navigate) => {
    delete api.defaults.headers.common.Authorization;
    // AsyncStorage.removeItem("myToken");
    localStorage.removeItem("myToken");
    navigate("/signin");
    this.user = null;
    this.loading = false;
  };
}
const authstore = new AuthStore();
authstore.checkForToken();
export default authstore;
