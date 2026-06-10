// Botão flutuante de alto contraste.

const STORAGE_TEMA = "equilibrioTemaVisual";
const ICONE_CONTRASTE = "./src/assets/images/alto-contraste.jpg";

let contrasteAtivo = false;

function persistirTemaVisual() {
  if (contrasteAtivo) {
    localStorage.setItem(STORAGE_TEMA, "contraste");
  } else {
    localStorage.removeItem(STORAGE_TEMA);
  }
}

function aplicarAltoContraste(ativo) {
  contrasteAtivo = ativo;
  document.body.classList.toggle("alto-contraste", ativo);

  const botao = document.querySelector("#botao-contraste");
  if (botao) {
    botao.setAttribute("aria-pressed", ativo ? "true" : "false");
    botao.setAttribute("aria-label", ativo ? "Desativar alto contraste" : "Ativar alto contraste");
  }

  persistirTemaVisual();
}

function restaurarTemaSalvo() {
  if (localStorage.getItem(STORAGE_TEMA) === "contraste") {
    aplicarAltoContraste(true);
  }
}

function configurarAltoContraste() {
  const botao = document.querySelector("#botao-contraste");
  if (!botao) return;

  const icone = botao.querySelector(".botao-contraste-icone");
  if (icone && !icone.getAttribute("src")) {
    icone.setAttribute("src", ICONE_CONTRASTE);
  }

  restaurarTemaSalvo();

  botao.addEventListener("click", () => {
    aplicarAltoContraste(!contrasteAtivo);
  });
}

document.addEventListener("DOMContentLoaded", configurarAltoContraste);
