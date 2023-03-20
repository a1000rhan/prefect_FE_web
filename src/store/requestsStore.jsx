import axios from "axios";
import { makeAutoObservable, configure } from "mobx";
import api from "./api";
import authstore from "./authStore";
import profileStore from "./profileStore";

configure({
  enforceActions: "never",
});

class RequestStore {
  requests = [];
  isLoading = true;
  numberRdone = 0;
  numberRpending = 0;
  numberRcanceled = 0;
  constructor() {
    makeAutoObservable(this, {});
  }

  getAllRequests = async () => {
    try {
      const response = await api.get("requests/");
      this.numberRdone = await api.get("requests/nDone");
      this.numberRpending = await api.get("requests/nPending");
      this.numberRcanceled = await api.get("requests/nCanceled");
      this.requests = response.data;
      this.isLoading = false;
    } catch (error) {
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 15 ~ RequestStore ~ getAllRequests= ~ error",
        error
      );
    }
  };

  createNewRequests = async (
    newRequest,
    theWorker,
    navigate,
    Swal,
    setIsLoading
  ) => {
    try {
      this.isLoading = true;
      const response = await api.post("requests/createRequest", newRequest);
      this.requests.push(newRequest);

      const pushRequest = profileStore.workers.find(
        (worker) => worker._id == theWorker
      );

      pushRequest.requests.push(response.data._id);
      await api.put(`/profiles/${pushRequest._id}`, pushRequest);

      await this.getAllRequests();
      this.isLoading = false;
      setIsLoading(false);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your Request has Successfully created",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/");
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
  updateRequest = async (
    updateRequest,
    theWorker,
    navigate,
    Swal,
    setIsLoading
  ) => {
    try {
      Swal.fire({
        title: "Are you sure you want to change the request?",

        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const theChoosenWorker = profileStore.workers.find(
            (worker) => worker._id === theWorker
          );

          const resp = await api.put(
            `requests/updateRequest/${updateRequest._id}`,
            updateRequest
          );
          const foundRequest = theChoosenWorker?.requests.some((req) => {
            return req._id === resp.data._id;
          });

          if (foundRequest) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "the request is chenged",
              showConfirmButton: false,
            });
            navigate("/");
            profileStore.fetchProfiles();
            return;
          } else {
            if (theChoosenWorker != null) {
              theChoosenWorker?.requests.push(resp.data._id);
              await api.put(
                `/profiles/${theChoosenWorker._id}`,
                theChoosenWorker
              );
              Swal.fire("Saved!", "", "success");
            }
          }
          profileStore.fetchProfiles();
          navigate("/");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }

        console.log(
          "🚀 ~ file: requestsStore.jsx:133 ~ RequestStore ~ updateRequest:",
          updateRequest
        );
      });
      setIsLoading(false);

      profileStore.fetchProfiles();
      this.getAllRequests();

      this.isLoading = false;
    } catch (error) {
      console.log(
        "🚀 ~ file: requestsStore.jsx:145 ~ RequestStore ~ error:",
        error
      );
      setIsLoading(false);
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

  uploadPdf = async (fileData, request, pdf, Swal) => {
    try {
      const formData = new FormData();

      Swal.fire({
        title: "Are you done from this request",

        showCancelButton: true,
        confirmButtonText: "Done",
      }).then(async (result) => {
        if (result.isConfirmed) {
          request.status = "done";
          formData.append("receipt", fileData);

          await api.put(`requests/receipt/${request._id}`, formData);
          const response = await api.put(
            `requests/done/${request._id}`,
            request
          );

          pdf.save(request._id + ".pdf");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your Request has Successfully Done",
            showConfirmButton: false,
            timer: 3000,
          });
          this.getAllRequests();
          window.location.reload();
        }
      });
      this.isLoading = false;
    } catch (error) {
      console.log(
        "🚀 ~ file: requestsStore.jsx ~ line 125 ~ RequestStore ~ uploadPdf= ~ error",
        error
      );
    }
  };

  removeRequest = async (request, navigate, Swal, setIsLoading) => {
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
      profileStore.fetchProfiles();
      this.getAllRequests();
      this.loading = false;
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
}

const requestStore = new RequestStore();
requestStore.getAllRequests();
export default requestStore;
