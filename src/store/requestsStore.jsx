import { makeAutoObservable } from "mobx";
import api from "./api";
import authstore from "./authStore";
import profileStore from "./profileStore";

class RequestStore {
  requests = [];
  isLoading = true;
  constructor() {
    makeAutoObservable(this, {});
  }

  getAllRequests = async () => {
    try {
      const response = await api.get("requests/");
      this.requests = response.data;
      this.isLoading = false;
    } catch (error) {
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 15 ~ RequestStore ~ getAllRequests= ~ error",
        error
      );
    }
  };

  createNewRequests = async (newRequest, theWorker, navigate, Swal) => {
    try {
      const response = await api.post("requests/createRequest", newRequest);
      this.requests.push(newRequest);
      navigate("/requests");
      this.getAllRequests();
      const pushRequest = profileStore.workers.find(
        (worker) => worker._id == theWorker
      );

      pushRequest.requests.push(response.data._id);
      await api.put(`/profiles/${pushRequest._id}`, pushRequest);

      this.isLoading = false;

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your Request has Successfully created",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 27 ~ RequestStore ~ createNewRequests=async ~ error",
        error
      );
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Sorry Something Went Wrong",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  updateRequest = async (Updaterequest, theWorker, navigate, Swal) => {
    try {
      const pushRequest = profileStore.workers.find(
        (worker) => worker._id == theWorker
      );

      const resp = await api.put(
        `requests/updateRequest/${Updaterequest._id}`,
        Updaterequest
      );

      pushRequest.requests.find(async (req) => {
        if (req._id !== resp.data._id || req._id === "select") {
          pushRequest.requests.push(resp.data._id);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your Request has Successfully updated",
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          return Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Sorry Something Went Wrong",
            showConfirmButton: false,
          });
        }
      });
      await api.put(`/profiles/${pushRequest._id}`, pushRequest);

      this.isLoading = false;
      navigate("/");
      this.getAllRequests();
    } catch (error) {
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 38 ~ RequestStore ~ updateRequest= ~ error",
        error
      );
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Sorry Something Went Wrong",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  removeRequest = async (request, navigate) => {
    try {
      const response = await api.delete(`requests/${request._id}`);
      this.requests = this.requests.filter((req) => req._id == request._id);

      this.loading = false;
      this.getAllRequests();
    } catch (error) {
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 87 ~ RequestStore ~ removeRequest= ~ error",
        error
      );
    }
  };
}

const requestStore = new RequestStore();
requestStore.getAllRequests();
export default requestStore;
