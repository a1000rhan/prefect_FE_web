import { makeAutoObservable } from "mobx";
import api from "./api";
import authstore from "./authStore";

class ProfileStore {
  profiles = [];
  workers = [];
  oneProfile = [];
  loading = true;

  constructor() {
    makeAutoObservable(this, {});
  }

  fetchProfiles = async () => {
    try {
      const res = await api.get("/profiles");
      this.profiles = res.data;
      const MyProfile = this.profiles?.find(
        (profile) => profile.owner?._id === authstore.user?._id
      );
      const MyWorkers = this.profiles?.filter(
        (worker) => worker.owner.type === "worker"
      );
      this.workers = MyWorkers;
      this.oneProfile = MyProfile;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };
  fetchWorkersProfiles = async () => {
    try {
      const res = await api.get("/profiles/workers");
      this.workers = res.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };

  updateProfile = async (profile, Swal, navigate) => {
    console.log(
      "🚀 ~ file: profileStore.jsx ~ line 43 ~ ProfileStore ~ updateProfile= ~ profile",
      profile
    );
    try {
      await this.fetchProfiles();

      console.log(
        "🚀 ~ file: profileStore.jsx ~ line 46 ~ ProfileStore ~ updateProfile= ~ this.oneProfile",
        this.oneProfile
      );
      const res = await api.put(`/profiles/${this.oneProfile._id}`, profile);
      this.profiles = this.profiles.map((pro) =>
        pro._id === profile._id ? res.data : pro
      );
      navigate("/requests");
      this.loading = false;

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You have Successfully Signed Up",
        showConfirmButton: false,
        timer: 3000,
      });
      this.fetchProfiles();
    } catch (error) {
      console.log(error);
      Swal.fire(
        "You have Entered wrong info!",
        "You clicked the button!",
        "error"
      );
    }
  };
}

const profileStore = new ProfileStore();
profileStore.fetchProfiles();
export default profileStore;
