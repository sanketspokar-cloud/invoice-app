const { jsPDF } = window.jspdf;

function generateInvoice() {

  // Output basic details
  invOut.innerText = invNo.value;
  dateOut.innerText = invDate.value;
  custOut.innerText = custName.value;
  addrOut.innerText = custAddr.value;
  gstOut.innerText = custGST.value;

  itemRows.innerHTML = "";
  let taxableAmount = 0;

  function addItem(name, hsn, checked, qty, rate) {
    if (checked && qty > 0 && rate > 0) {
      const amt = qty * rate;
      taxableAmount += amt;

      itemRows.innerHTML += `
        <tr>
          <td>${name}</td>
          <td>${hsn}</td>
          <td>${qty}</td>
          <td>${rate}</td>
          <td>${amt.toFixed(2)}</td>
        </tr>`;
    }
  }

  addItem("Mirchi Powder", "09042211", aCheck.checked, +aQty.value, +aRate.value);
  addItem("Haldi Powder", "09103030", bCheck.checked, +bQty.value, +bRate.value);
  addItem("Dhaniya Powder", "09092200", cCheck.checked, +cQty.value, +cRate.value);

  const gstRate = Number(gstRateInput.value) || 0;
  const gstin = (custGST.value || "").trim();

  let cgst = 0, sgst = 0, igst = 0;

  // Reset rows visibility
  cgstRow.style.display = "none";
  sgstRow.style.display = "none";
  igstRow.style.display = "none";

  if (gstin && !gstin.startsWith("27")) {
    // IGST
    igst = taxableAmount * gstRate / 100;
    igstRow.style.display = "table-row";
  } else {
    // CGST + SGST
    cgst = taxableAmount * (gstRate / 2) / 100;
    sgst = taxableAmount * (gstRate / 2) / 100;
    cgstRow.style.display = "table-row";
    sgstRow.style.display = "table-row";
  }

  const grandTotal = taxableAmount + cgst + sgst + igst;

  taxableOut.innerText = taxableAmount.toFixed(2);
  cgstOut.innerText = cgst.toFixed(2);
  sgstOut.innerText = sgst.toFixed(2);
  igstOut.innerText = igst.toFixed(2);
  grandOut.innerText = grandTotal.toFixed(2);
}

function createPDF(openOnly) {
  html2canvas(invoice, { scale: 3 }).then(canvas => {
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, imgWidth, imgHeight);
    openOnly ? pdf.output("dataurlnewwindow") : pdf.save("Invoice.pdf");
  });
}

function previewPDF() { createPDF(true); }
function savePDF() { createPDF(false); }
