if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  const root = document.documentElement;
  root.setAttribute("data-bs-theme", "dark");
}
