const { jsPDF } = window.jspdf;

function generateInvoice() {

  document.getElementById("icust").innerText =
    custName.value;

  document.getElementById("icgst").innerText =
    custGST.value;

  document.getElementById("iinv").innerText =
    invNo.value;

  document.getElementById("idate").innerText =
    invDate.value;

  const rows = document.getElementById("rows");
  rows.innerHTML = "";
  let total = 0;

  function add(name, chk, qty, rate) {
    if (chk.checked && qty.value && rate.value) {
      let amt = qty.value * rate.value;
      total += amt;
      rows.innerHTML += `
        <tr>
          <td>${name}</td>
          <td>${qty.value}</td>
          <td>${rate.value}</td>
          <td>${amt}</td>
        </tr>`;
    }
  }

  add("Item A", aCheck, aQty, aRate);
  add("Item B", bCheck, bQty, bRate);
  add("Item C", cCheck, cQty, cRate);

  document.getElementById("itotal").innerText = total;

  // Save locally
  localStorage.setItem(invNo.value, document.getElementById("invoice").innerHTML);
}

function previewPDF() {
  html2canvas(invoice).then(canvas => {
    const pdf = new jsPDF();
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 190, 0);
    pdf.output("dataurlnewwindow");
  });
}

function savePDF() {
  html2canvas(invoice).then(canvas => {
    const pdf = new jsPDF();
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 190, 0);
    pdf.save("Invoice.pdf");
  });
}
