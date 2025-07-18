function createElement() {
  const answerEl = document.createElement("textarea");
  answerEl.placeholder = "Comment allez-vous?";
  answerEl.ariaLabel = "Comment allez-vous?";
  console.log(answerEl.value);
  return answerEl;
}
createElement();

const translationFormEl = document.getElementById("translation-form");
translationFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const translationFormElData = new FormData(translationFormEl);
  const selectedLang = translationFormElData.get("language");
  const questionEl = translationFormElData.get("question");
  console.log(selectedLang);
  console.log(questionEl);
});
