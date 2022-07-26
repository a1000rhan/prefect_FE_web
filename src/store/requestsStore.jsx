import axios from "axios";
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
  updateRequest = async (updateRequest, theWorker, navigate, Swal) => {
    try {
      Swal.fire({
        title: "Do you want to save the changes?",

        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const pushRequest = profileStore.workers.find(
            (worker) => worker._id == theWorker
          );

          const resp = await api.put(
            `requests/updateRequest/${updateRequest._id}`,
            updateRequest
          );

          /*
          pushRequest?.requests.find(async (req) => {
            if (req._id !== resp.data._id || req._id === "select") {
              pushRequest?.requests.push(resp.data._id);
            }

             else {
              return Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Sorry Something Went Wrong",
                showConfirmButton: false,
              });
            }
          });
          */
          await api.put(`/profiles/${pushRequest._id}`, pushRequest);

          navigate("/");
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
      console.log("1");
      profileStore.fetchProfiles();
      this.getAllRequests();

      this.isLoading = false;
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

  cancelRequest = async (request, navigate, Swal) => {
    try {
      await api.put(`requests/cancel/${request._id}`, request);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "your request has been canceled",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 128 ~ RequestStore ~ cancelRequest= ~ error",
        error
      );
    }
  };

  uploadPdf = async (fileData, request, Swal) => {
    try {
      const formData = new FormData();
      request.status = "done";
      formData.append("receipt", fileData);

      // for (const key in updateRequest) formData.append(key, updateRequest[key]);
      await api.put(`requests/receipt/${request._id}`, formData);
      const response = await api.put(`requests/done/${request._id}`, request);
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 153 ~ RequestStore ~ uploadPdf= ~ response",
        response.data
      );
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your Request has Successfully Done",
        showConfirmButton: false,
        timer: 3000,
      });
      this.getAllRequests();
      this.isLoading = false;
    } catch (error) {
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 125 ~ RequestStore ~ uploadPdf= ~ error",
        error
      );
    }
  };

  doneRequest = async (request, navigate, Swal) => {
    try {
    } catch (error) {
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 170 ~ RequestStore ~ doneRequest= ~ error",
        error
      );
    }
  };
  removeRequest = async (request, navigate, Swal) => {
    try {
      Swal.fire({
        title: "Do you want to Delete the Request?",

        showCancelButton: true,
        confirmButtonText: "Confirm",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await api.delete(`requests/${request._id}`);
          this.requests = this.requests.filter((req) => req._id == request._id);

          Swal.fire("Deleted!", "", "success");
        }
      });

      this.getAllRequests();
      this.loading = false;
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
