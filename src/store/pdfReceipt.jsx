import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import React from "react";

import logo from "../assets/logo.jpg";
import requestStore from "./requestsStore";

class PDFReceipt {
  //.....PDF .......//

  pdfFunction = async (request, setFilePdf) => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "A4",
    });
    pdf.setFont("../assets/Cairo-VariableFont_slnt,wght.ttf", "Cairo");

    pdf.addImage(logo, "JPG", 40, 10, 50, 50);
    pdf.setFontSize(40);
    pdf.text("Invoice", 100, 50);

    pdf.setFontSize(12);
    pdf.text("Customer Info:", 40, 80);
    autoTable(pdf, { html: "#my-table", margin: { top: 80 } });
    autoTable(pdf, {
      head: [["Name", "Phone", "address"]],
      body: [
        [
          `${request?.customerName}`,
          `${request?.customerPhone}`,
          `Blc${request?.customerAddress[0].block}, St${request?.customerAddress[0].street}, Ho:${request?.customerAddress[0].house} ${request?.customerAddress[0].city}`,
        ],
      ],
    });
    pdf.text("The Problem:", 40, 150);
    autoTable(pdf, { html: "#my-table", margin: { top: 100 } });
    pdf.setFont("Cairo");
    const note = prompt("Enter your Notes");
    pdf.text(40, 220, "Notes:   " + note);

    autoTable(pdf, {
      head: [["Type", "Description", "Note"]],
      body: [
        [
          `${request?.problemDesc[0].unit}`,
          `${request?.problemDesc[0].operation}`,
          `${request.notes}`,
          `${note}`,
        ],
      ],
    });
    autoTable(pdf, { html: "#my-table", margin: { top: 140 } });

    // pdf.save("test.pdf");
    const data = pdf.output("blob");

    const file = new File([data], `${request._id}.pdf`, { type: data.type });

    setFilePdf(request?.receipt);

    requestStore.uploadPdf(file, request, pdf, Swal);
  };
  //.....PDF .......//
}

const pdfReceipt = new PDFReceipt();

export default pdfReceipt;
