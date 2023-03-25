import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import React from "react";
import cairoRegular from "../assets/Cairo-Regular.ttf";
import cairoBold from "../assets/Cairo-Bold.ttf";
import logo from "../assets/logo.jpg";
import requestStore from "./requestsStore";

class PDFReceipt {
  //.....PDF .......//

  pdfFunction = async (request, setFilePdf) => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "A4",
      compress: true,
      hotfixes: ["px_scaling"],
    });

    pdf.addFileToVFS("Cairo-Regular", cairoRegular);
    pdf.addFont("Cairo-Regular", "normal");
    pdf.addFileToVFS("Cairo-Bold", cairoBold);
    pdf.addFont("Cairo-Bold", "bold");
    // Set the font to Cairo and the font size to 12

    pdf.addImage(logo, "JPG", 40, 10, 50, 50);
    pdf.setFontSize(40);
    pdf.text("Invoice", 100, 50);
    pdf.setFontSize(12);
    pdf.text("Customer Info:", 40, 80);
    autoTable(pdf, {
      html: "#my-table",
      margin: { top: 80 },
      font: "Cairo-Regular",
    });
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
    autoTable(pdf, {
      html: "#my-table",
      margin: { top: 100 },
      font: "Cairo-Regular",
    });

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
    autoTable(pdf, {
      html: "#my-table",
      margin: { top: 140 },
      font: "Cairo-Regular",
    });
    // pdf.save("test.pdf");
    const data = pdf.output("blob");
    const file = new File([data], `${request._id}.pdf`, { type: data.type });
    setFilePdf(request?.receipt);

    await requestStore.uploadPdf(file, request, pdf, Swal);
  };
  //.....PDF .......//
}

const pdfReceipt = new PDFReceipt();

export default pdfReceipt;
