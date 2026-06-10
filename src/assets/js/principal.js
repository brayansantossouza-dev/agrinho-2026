// principal.js — página inicial (index.html).
// Rotação do hero, seta de voltar e links externos.

const PALAVRAS_HERO = ["Necessário", "Possível", "Urgente", "De Todos"];
const INTERVALO_HERO_MS = 1600;
const FADE_HERO_MS = 120;

let indiceHero = 0;
let timerHero = null;
let heroPausado = false;
let trocandoHero = false;

function atualizarIndicadoresHero() {
  document.querySelectorAll("#hero-indicadores .hero-indicador").forEach((ponto, i) => {
    const ativo = i === indiceHero;
    ponto.classList.toggle("hero-indicador--ativo", ativo);
    ponto.setAttribute("aria-current", ativo ? "true" : "false");
  });
}

function irParaPalavraHero(novoIndice) {
  const subtitulo = document.querySelector("#hero-subtitulo");
  if (!subtitulo || trocandoHero) return;

  const indiceNormalizado =
    ((novoIndice % PALAVRAS_HERO.length) + PALAVRAS_HERO.length) % PALAVRAS_HERO.length;
  if (indiceNormalizado === indiceHero) return;

  trocandoHero = true;
  subtitulo.classList.add("trocando");

  window.setTimeout(() => {
    indiceHero = indiceNormalizado;
    subtitulo.textContent = PALAVRAS_HERO[indiceHero];
    subtitulo.classList.remove("trocando");
    atualizarIndicadoresHero();
    trocandoHero = false;
  }, FADE_HERO_MS);
}

function trocarPalavraHero() {
  irParaPalavraHero(indiceHero + 1);
}

function reiniciarRotacaoHero() {
  pararRotacaoHero();
  iniciarRotacaoHero();
}

function iniciarRotacaoHero() {
  if (timerHero || heroPausado) return;
  timerHero = window.setInterval(trocarPalavraHero, INTERVALO_HERO_MS);
}

function pararRotacaoHero() {
  if (!timerHero) return;
  window.clearInterval(timerHero);
  timerHero = null;
}

function configurarIndicadoresHero() {
  document.querySelectorAll("#hero-indicadores .hero-indicador").forEach((botao) => {
    botao.addEventListener("click", () => {
      const indice = Number(botao.dataset.heroIndice);
      if (Number.isNaN(indice)) return;
      irParaPalavraHero(indice);
      reiniciarRotacaoHero();
    });
  });
}

function configurarRotacaoHero() {
  const hero = document.querySelector(".hero-inicio");
  const subtitulo = document.querySelector("#hero-subtitulo");
  if (!hero || !subtitulo) return;

  configurarIndicadoresHero();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroPausado = true;
    return;
  }

  hero.addEventListener("mouseenter", pararRotacaoHero);
  hero.addEventListener("mouseleave", iniciarRotacaoHero);
  hero.addEventListener("focusin", pararRotacaoHero);
  hero.addEventListener("focusout", iniciarRotacaoHero);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pararRotacaoHero();
    else iniciarRotacaoHero();
  });

  atualizarIndicadoresHero();
  iniciarRotacaoHero();
}

function configurarBotaoSubir() {
  const botao = document.querySelector("#botao-subir");
  const missao = document.querySelector("#missao");
  if (!botao || !missao) return;

  const atualizarVisibilidade = () => {
    const limite = missao.offsetTop + missao.offsetHeight;
    botao.hidden = window.scrollY < limite - 80;
  };

  window.addEventListener("scroll", atualizarVisibilidade, { passive: true });
  atualizarVisibilidade();
}

function configurarLinksExternos() {
  document.querySelectorAll(".link-externo").forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  configurarRotacaoHero();
  configurarBotaoSubir();
  configurarLinksExternos();
});
