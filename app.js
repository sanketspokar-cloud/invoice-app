const { jsPDF } = window.jspdf;

function generateInvoice() {

  alert("Generate Invoice clicked ✅"); // DEBUG CONFIRMATION

  const invNo = document.getElementById("invNo").value;
  const invDate = document.getElementById("invDate").value;
  const custName = document.getElementById("custName").value;
  const custGST = document.getElementById("custGST").value.trim();
  const gstRate = Number(document.getElementById("gstRate").value || 0);

  document.getElementById("oInv").innerText = invNo;
  document.getElementById("oDate").innerText = invDate;
  document.getElementById("oCust").innerText = custName;
  document.getElementById("oGST").innerText = custGST;

  const rows = document.getElementById("rows");
  rows.innerHTML = "";

  let taxable = 0;

  const checked = document.getElementById("mirchiChk").checked;
  const qty = Number(document.getElementById("mirchiQty").value);
  const rate = Number(document.getElementById("mirchiRate").value);

  if (checked && qty > 0 && rate > 0) {
    const amt = qty * rate;
    taxable += amt;

    rows.innerHTML = `
      <tr>
        <td>Mirchi Powder</td>
        <td>09042211</td>
        <td>${qty}</td>
        <td>${rate}</td>
        <td>${amt.toFixed(2)}</td>
      </tr>
    `;
  }

  let cgst = 0, sgst = 0, igst = 0;

  document.getElementById("cgstLine").style.display = "none";
  document.getElementById("sgstLine").style.display = "none";
  document.getElementById("igstLine").style.display = "none";

  if (custGST && !custGST.startsWith("27")) {
    igst = taxable * gstRate / 100;
    document.getElementById("igstLine").style.display = "block";
  } else {
    cgst = taxable * (gstRate / 2) / 100;
    sgst = taxable * (gstRate / 2) / 100;
    document.getElementById("cgstLine").style.display = "block";
    document.getElementById("sgstLine").style.display = "block";
  }

  document.getElementById("oTax").innerText = taxable.toFixed(2);
  document.getElementById("oCGST").innerText = cgst.toFixed(2);
  document.getElementById("oSGST").innerText = sgst.toFixed(2);
  document.getElementById("oIGST").innerText = igst.toFixed(2);

  document.getElementById("oGrand").innerText =
    (taxable + cgst + sgst + igst).toFixed(2);
}
