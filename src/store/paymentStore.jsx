import { makeAutoObservable } from "mobx";
import decode from "jwt-decode";

import React from "react";
import api from "./api";
import axios from "axios";

class PaymentStore {
  token = "";
  baseURL = "https://apitest.myfatoorah.com";

  header = {
    body: { InvoiceAmount: 100, CurrencyIso: "KWD" },
  };

  options = {
    PaymentMethodId: "2",
    CustomerName: "Ahmed",
    DisplayCurrencyIso: "KWD",
    MobileCountryCode: "+965",
    CustomerMobile: "12345678",
    CustomerEmail: "xx@yy.com",
    InvoiceValue: 100,
    CallBackUrl: "https://google.com",
    ErrorUrl: "https://google.com",
    Language: "en",
    CustomerReference: "ref 1",
    CustomerCivilId: 12345678,
    UserDefinedField: "Custom field",
    ExpireDate: "",
    CustomerAddress: {
      Block: "",
      Street: "",
      HouseBuildingNo: "",
      Address: "",
      AddressInstructions: "",
    },
    InvoiceItems: [{ ItemName: "Product 01", Quantity: 1, UnitPrice: 100 }],
  };

  constructor() {
    makeAutoObservable(this, {});
  }

  setToken = async (token) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.token = token;
    console.log(this.token);
  };

  getToken = async () => {
    try {
      const response = await axios.post(
        this.baseURL + "/v2/ExecutePayment",
        this.options
      );

      this.setToken(response.data.Token);
    } catch (error) {
      console.log(error);
    }
  };
}

const paymentStore = new PaymentStore();
export default paymentStore;
