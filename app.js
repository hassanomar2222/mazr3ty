let currentLine = null;
let currentTree = null;

document.addEventListener("DOMContentLoaded", () => {
  const linesList = document.getElementById("lines-list");
  for (let i = 1; i <= 25; i++) {
    const btn = document.createElement("div");
    btn.className = "line-btn";
    btn.textContent = `الصف ${i}`;
    btn.onclick = () => openLine(i);
    linesList.appendChild(btn);
  }
});

function openLine(lineNumber) {
  currentLine = lineNumber;
  document.getElementById("lines-section").classList.add("hidden");
  document.getElementById("trees-section").classList.remove("hidden");
  document.getElementById("trees-title").textContent = `أشجار الصف ${lineNumber}`;

  const treesList = document.getElementById("trees-list");
  treesList.innerHTML = "";
  for (let i = 1; i <= 41; i++) {
    const btn = document.createElement("div");
    btn.className = "tree-btn";
    btn.textContent = `شجرة ${i}`;
    btn.onclick = () => openTree(i);
    treesList.appendChild(btn);
  }
}

function openTree(treeNumber) {
  currentTree = treeNumber;
  document.getElementById("trees-section").classList.add("hidden");
  document.getElementById("tree-detail-section").classList.remove("hidden");
  document.getElementById("tree-title").textContent = `شجرة ${treeNumber} - صف ${currentLine}`;
  loadTreeData();
}

function goBackToLines() {
  document.getElementById("trees-section").classList.add("hidden");
  document.getElementById("lines-section").classList.remove("hidden");
}

function goBackToTrees() {
  document.getElementById("tree-detail-section").classList.add("hidden");
  document.getElementById("trees-section").classList.remove("hidden");
}

function addImage() {
  document.getElementById("image-input").click();
}

document.getElementById("image-input").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const key = `tree-${currentLine}-${currentTree}`;
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    if (!data.images) data.images = [];
    data.images.push(e.target.result);
    localStorage.setItem(key, JSON.stringify(data));
    loadTreeData();
  };
  reader.readAsDataURL(file);
});

function saveNote() {
  const status = document.getElementById("tree-status").value;
  const note = document.getElementById("tree-note").value;
  const type = document.getElementById("tree-type").value;
  const key = `tree-${currentLine}-${currentTree}`;
  const data = JSON.parse(localStorage.getItem(key) || "{}");

  data.status = status;
  data.note = note;
  data.type = type;

  localStorage.setItem(key, JSON.stringify(data));
  alert("✅ تم حفظ الملاحظات.");
}

function loadTreeData() {
  const container = document.getElementById("tree-images");
  container.innerHTML = "";

  const key = `tree-${currentLine}-${currentTree}`;
  const data = JSON.parse(localStorage.getItem(key) || "{}");
  const images = data.images || [];

  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    container.appendChild(img);
  });

  document.getElementById("tree-status").value = data.status || "ممتازة";
  document.getElementById("tree-note").value = data.note || "";
  document.getElementById("tree-type").value = data.type || "كيت";
}
