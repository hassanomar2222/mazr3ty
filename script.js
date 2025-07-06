const rowsContainer = document.getElementById("rows-container");
const treesContainer = document.getElementById("trees-container");

const mainSection = document.getElementById("main-section");
const treesSection = document.getElementById("trees-section");
const treeSection = document.getElementById("tree-section");

const selectedRowTitle = document.getElementById("selected-row");
const selectedTreeTitle = document.getElementById("selected-tree");

let currentRow = null;
let currentTree = null;

// عرض الصفوف
for (let i = 1; i <= 26; i++) {
  const btn = document.createElement("button");
  btn.textContent = `الصف ${i}`;
  btn.onclick = () => showTrees(i);
  rowsContainer.appendChild(btn);
}

function showTrees(rowNumber) {
  currentRow = rowNumber;
  mainSection.classList.add("hidden");
  treesSection.classList.remove("hidden");
  selectedRowTitle.textContent = `الصف ${rowNumber}`;
  treesContainer.innerHTML = "";

  for (let i = 1; i <= 41; i++) {
    const btn = document.createElement("button");
    btn.textContent = `شجرة ${i}`;
    btn.onclick = () => showTreeDetails(i);
    treesContainer.appendChild(btn);
  }
}

function showTreeDetails(treeNumber) {
  currentTree = treeNumber;
  treesSection.classList.add("hidden");
  treeSection.classList.remove("hidden");
  selectedTreeTitle.textContent = `الصف ${currentRow} - شجرة ${treeNumber}`;
  document.getElementById("preview").classList.add("hidden");

  const data = JSON.parse(localStorage.getItem(`tree-${currentRow}-${treeNumber}`)) || {};
  document.getElementById("tree-type").value = data.type || "";
  document.getElementById("tree-status").value = data.status || "";
  document.getElementById("tree-notes").value = data.notes || "";
}

function goBackToRows() {
  treesSection.classList.add("hidden");
  mainSection.classList.remove("hidden");
}

function goBackToTrees() {
  treeSection.classList.add("hidden");
  treesSection.classList.remove("hidden");
}

function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById("preview");
    img.src = e.target.result;
    img.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}

function saveTreeData() {
  const type = document.getElementById("tree-type").value;
  const status = document.getElementById("tree-status").value;
  const notes = document.getElementById("tree-notes").value;

  const data = { type, status, notes };
  localStorage.setItem(`tree-${currentRow}-${currentTree}`, JSON.stringify(data));
  alert("✅ تم حفظ البيانات بنجاح");
}
