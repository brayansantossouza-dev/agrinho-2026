// atribuicoes.js — links externos em nova aba.

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".link-externo").forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
});
