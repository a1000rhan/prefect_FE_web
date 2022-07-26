import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import React from "react";
import requestStore from "./requestsStore";

class PDFReceipt {
  //.....PDF .......//

  pdfFunction = async (request, setFilePdf) => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "A4",
    });
    // pdf.addImage(logo, "PNG", 100, 10, 100, 100);
    pdf.text("Hello World", 100, 200);

    // pdf.save("test.pdf");
    const data = await pdf.output("blob");

    const file = new File([data], "test.pdf", { type: data.type });

    setFilePdf(request?.receipt);
    requestStore.uploadPdf(file, request, Swal);
  };
  //.....PDF .......//
}

const pdfReceipt = new PDFReceipt();

export default pdfReceipt;
