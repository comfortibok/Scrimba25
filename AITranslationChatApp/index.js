const content = document.getElementById("content");
const instructionEl = document.getElementById("instruction");
function createElement() {
  const textEl = document.createElement("div");
  textEl.classList.add("text", "content");
  const translationEl = document.createElement("div");
  translationEl.classList.add("translation", "content");
  console.log(textEl);
  console.log(translationEl);
  return { instructionEl, textEl, translationEl };
}
createElement();

const translationFormEl = document.getElementById("translation-form");
translationFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const translationFormElData = new FormData(translationFormEl);
  const messageEl = translationFormElData.get("message");
  console.log(messageEl);
  const { instructionEl, textEl, translationEl } = createElement();
  console.log((textEl.textContent = messageEl));
  content.appendChild(textEl, translationEl, instructionEl);
});
