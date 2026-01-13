const { jsPDF } = window.jspdf;

function generateInvoice() {

  // Basic details
  iinv.innerText = invNo.value;
  idate.innerText = invDate.value;
  icust.innerText = custName.value;
  icgst.innerText = custGST.value;
  icaddr.innerText = custAddr.value;

  rows.innerHTML = "";
  let taxable = 0;

  function addItem(name, hsn, chk, qty, rate) {
    if (chk.checked && qty.value && rate.value) {
      const amt = qty.value * rate.value;
      taxable += amt;

      rows.innerHTML += `
        <tr>
          <td>${name}</td>
          <td>${hsn}</td>
          <td>${qty.value}</td>
          <td>${rate.value}</td>
          <td>${amt.toFixed(2)}</td>
        </tr>`;
    }
  }

  addItem("Mirchi Powder", "09042211", aCheck, aQty, aRate);
  addItem("Haldi Powder", "09103030", bCheck, bQty, bRate);
  addItem("Dhaniya Powder", "09092200", cCheck, cQty, cRate);

  const rate = Number(gstRate.value || 0);
  let cgst = 0, sgst = 0, igst = 0;

  const gstin = custGST.value || "";

  if (gstin && !gstin.startsWith("27")) {
    // IGST
    igst = taxable * rate / 100;
    cgstRow.style.display = "none";
    sgstRow.style.display = "none";
    igstRow.style.display = "table-row";
  } else {
    // CGST + SGST
    cgst = taxable * (rate / 2) / 100;
    sgst = taxable * (rate / 2) / 100;
    cgstRow.style.display = "table-row";
    sgstRow.style.display = "table-row";
    igstRow.style.display = "none";
  }

  const grand = taxable + cgst + sgst + igst;

  taxable.innerText = taxable.toFixed(2);
  cgst.innerText = cgst.toFixed(2);
  sgst.innerText = sgst.toFixed(2);
  igst.innerText = igst.toFixed(2);
  grand.innerText = grand.toFixed(2);
}

function createPDF(openOnly) {
  html2canvas(invoice, { scale: 3 }).then(canvas => {
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, imgWidth, imgHeight);

    openOnly
      ? pdf.output("dataurlnewwindow")
      : pdf.save(`Invoice_${iinv.innerText}.pdf`);
  });
}

function previewPDF() {
  createPDF(true);
}

function savePDF() {
  createPDF(false);
}
