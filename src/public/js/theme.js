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
