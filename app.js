const { jsPDF } = window.jspdf;

function generateInvoice() {

  outCust.innerText = custName.value;
  outGST.innerText = custGST.value;
  outInv.innerText = invNo.value;
  outDate.innerText = invDate.value;

  itemRows.innerHTML = "";
  let taxable = 0;

  function addItem(name, hsn, chk, qty, rate) {
    if (chk && qty > 0 && rate > 0) {
      const amt = qty * rate;
      taxable += amt;
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

  addItem("Mirchi Powder","09042211",mirchiChk.checked,+mirchiQty.value,+mirchiRate.value);
  addItem("Haldi Powder","09103030",haldiChk.checked,+haldiQty.value,+haldiRate.value);
  addItem("Dhaniya Powder","09092200",dhaniyaChk.checked,+dhaniyaQty.value,+dhaniyaRate.value);

  const gstRate = Number(gstRateInput.value || 0);
  const gstin = (custGST.value || "").trim();

  let cgst = 0, sgst = 0, igst = 0;

  cgstRow.style.display = "none";
  sgstRow.style.display = "none";
  igstRow.style.display = "none";

  if (gstin && !gstin.startsWith("27")) {
    igst = taxable * gstRate / 100;
    igstRow.style.display = "table-row";
  } else {
    cgst = taxable * (gstRate / 2) / 100;
    sgst = taxable * (gstRate / 2) / 100;
    cgstRow.style.display = "table-row";
    sgstRow.style.display = "table-row";
  }

  outTaxable.innerText = taxable.toFixed(2);
  outCGST.innerText = cgst.toFixed(2);
  outSGST.innerText = sgst.toFixed(2);
  outIGST.innerText = igst.toFixed(2);
  outGrand.innerText = (taxable + cgst + sgst + igst).toFixed(2);
}

function makePDF(openOnly) {
  html2canvas(invoice, { scale: 3 }).then(canvas => {
    const pdf = new jsPDF("p","mm","a4");
    const w = 190;
    const h = canvas.height * w / canvas.width;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, w, h);
    openOnly ? pdf.output("dataurlnewwindow") : pdf.save("Invoice.pdf");
  });
}

function previewPDF(){ makePDF(true); }
function savePDF(){ makePDF(false); }
