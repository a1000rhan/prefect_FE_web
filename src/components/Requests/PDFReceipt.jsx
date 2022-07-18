import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import React from "react";

const PDFReceipt = ({ request }) => {
  const pdf = new jsPDF();
  autoTable(pdf, { html: "#my-table" });
  pdf.text(`${request.customerName}`, 10, 10);

  const handleDownload = (e) => {
    pdf.save("test1.pdf");
  };
  return (
    <div>
      <button onClick={handleDownload}>downloand</button>
      {pdf}
    </div>
  );
};

export default PDFReceipt;
