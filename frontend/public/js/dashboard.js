function abrirModal(id) {
  const modal = document.getElementById(id);
  if (!modal) {
    console.error(`❌ Modal ${id} não encontrado`);
    return;
  }
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
}

function fecharModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    event.target.setAttribute("aria-hidden", "true");
  }
});

document.addEventListener("DOMContentLoaded", async () => {

  const links = document.querySelectorAll(".sidebar nav a");
  const sections = document.querySelectorAll(".card-section");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      sections.forEach((section) => (section.hidden = true));

      const targetId = link.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.hidden = false;

      }
    });
  });
});
