import { makeAutoObservable, configure } from "mobx";
import api from "./api";
import authstore from "./authStore";

configure({
  enforceActions: "never",
});
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
    try {
      const formData = new FormData();
      for (const key in profile) formData.append(key, profile[key]);

      const res = await api.put(`/profiles/${this.oneProfile._id}`, formData);

      this.profiles = this.profiles.map((pro) =>
        pro._id === profile._id ? res.data : pro
      );
      navigate("/");
      this.loading = false;

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You have Successfully Signed Up",
        showConfirmButton: false,
        timer: 3000,
      });
      await this.fetchProfiles();
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

export default profileStore;
