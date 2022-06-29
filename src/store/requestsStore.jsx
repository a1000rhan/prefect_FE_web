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

  createNewRequests = async (newRequest, theWorker, navigate) => {
    try {
      const response = await api.post("requests/createRequest", newRequest);
      this.requests.push(newRequest);
      navigate("/requests");
      this.getAllRequests();
      const pushRequest = profileStore.workers.find(
        (worker) => worker._id == theWorker
      );
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 29 ~ RequestStore ~ createNewRequests= ~ response",
        response.data._id
      );
      pushRequest.requests.push(response.data._id);
      await api.put(`/profiles/${pushRequest._id}`, pushRequest);

      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 35 ~ RequestStore ~ createNewRequests= ~ pushRequest",
        pushRequest
      );
      this.isLoading = false;
    } catch (error) {
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 27 ~ RequestStore ~ createNewRequests=async ~ error",
        error
      );
    }
  };
  updateRequest = async (request) => {
    try {
      const resp = await api.put(
        `requests/updateRequest/${request._id}`,
        request
      );
      this.isLoading = false;
    } catch (error) {
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 38 ~ RequestStore ~ updateRequest= ~ error",
        error
      );
    }
  };
}

const requestStore = new RequestStore();
requestStore.getAllRequests();
export default requestStore;
