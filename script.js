function submitRequest() {
    const name = document.getElementById("name").value;
    const reg = document.getElementById("reg").value;
    const dept = document.getElementById("dept").value;
    const year = document.getElementById("year").value;
    const purpose = document.getElementById("purpose").value;
  
    const req = {
      name,
      reg,
      dept,
      year,
      purpose,
      status: "Pending"
    };
  
    const all = JSON.parse(localStorage.getItem("requests") || "[]");
    all.push(req);
    localStorage.setItem("requests", JSON.stringify(all));
    alert("Request submitted!");
  }
  
  function checkStatus() {
    const reg = document.getElementById("reg").value;
    const data = JSON.parse(localStorage.getItem("requests") || "[]");
    const found = data.find(r => r.reg === reg);
    const statusDiv = document.getElementById("status");
  
    if (!found) {
      statusDiv.innerText = "No request found.";
    } else if (found.status === "Approved") {
      statusDiv.innerHTML = `Approved ✅<br><a href="#" onclick="download('${found.name}', '${found.reg}', '${found.purpose}')">Download Bonafide</a>`;
    } else {
      statusDiv.innerText = found.status;
    }
  }
  
  function download(name, reg, purpose) {
    const content = `Bonafide Certificate\n\nThis is to certify that ${name} (Reg No: ${reg}) is a student of our college.\n\nPurpose: ${purpose}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = `Bonafide_${reg}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
  