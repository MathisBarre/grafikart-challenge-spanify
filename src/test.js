import * as JsDiff from "diff/lib/index.js";

const expected =
  "<span>Ceci</span> <span>est</span> <strong><span>un</span> <span>titre</span></strong>";
const title = document.querySelector(".title");
const display = document.getElementById("result");

if (expected === title.innerHTML) {
  display.classList.add("success");
  display.innerHTML =
    "<h2>Bravo !</h2><p>Le code semble fonctionner comme attendu :)";
} else {
  const diff = JsDiff.diffChars(expected, title.innerHTML);
  const fragment = document.createDocumentFragment();

  diff.forEach(function(part) {
    // green for additions, red for deletions
    // grey for common parts
    const color = part.added ? "green" : part.removed ? "red" : "grey";
    const span = document.createElement("span");
    span.style.color = color;
    span.appendChild(document.createTextNode(part.value));
    fragment.appendChild(span);
  });

  display.appendChild(fragment);
}
