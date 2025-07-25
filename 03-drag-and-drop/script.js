const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

for(const card of cards) {
  card.addEventListener("dargstart", dragStart)
  card.addEventListener("dragend", dragEnd)
}

for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}

function dargstart(e) {
  e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
  console.log("Drag ended");
}

