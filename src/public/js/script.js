if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  const root = document.documentElement;
  root.setAttribute("data-bs-theme", "dark");
  const cardColour = document.querySelectorAll(".card");
  cardColour.forEach((card) => {
    card.classList.toggle("card-color");
  });
}

function countCharacters() {
  const textArea = document.querySelector("textarea");

  const countLength = Number(textArea.value.length);

  const count = document.getElementById("count");

  if (countLength > 500) {
    return (count.innerText = `Character limit exceeded`);
  }

  return (count.innerText = `Characters left: ${500 - countLength}`);
}

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.classList.contains("open")) {
      const dialogue = e.target.previousSibling;
      dialogue.showModal();
    }
    if (e.target.classList.contains("close")) {
      const dialogue = e.target.parentElement;
      dialogue.close();
    }
  });
});
