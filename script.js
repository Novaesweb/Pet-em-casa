/*
 * Pet em Casa
 * Configure o WhatsApp oficial abaixo no formato internacional, apenas números.
 * Exemplo fictício: "5551999999999". Não use um número de exemplo em produção.
 */
const WHATSAPP_NUMBER = "";

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const bookingForm = document.querySelector("#booking-form");
const bookingDate = document.querySelector("#booking-date");
const serviceSelect = document.querySelector("#service-select");
const feedback = document.querySelector("#booking-feedback");

document.querySelector("#year").textContent = new Date().getFullYear();

if (bookingDate) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  bookingDate.min = localToday;
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    });
  });
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const service = link.getAttribute("data-service");
    if (serviceSelect) serviceSelect.value = service;
  });
});

function showFeedback(message, type = "success") {
  feedback.hidden = false;
  feedback.className = "booking-feedback" + (type === "error" ? " error" : "");
  feedback.textContent = message;
}

function formatDate(value) {
  if (!value) return "A combinar";
  const [year, month, day] = value.split("-");
  return day + "/" + month + "/" + year;
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.hidden = true;

    if (!bookingForm.reportValidity()) return;

    const data = new FormData(bookingForm);
    const details = {
      ownerName: String(data.get("ownerName") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      petName: String(data.get("petName") || "").trim(),
      species: String(data.get("species") || ""),
      size: String(data.get("size") || ""),
      service: String(data.get("service") || ""),
      date: formatDate(String(data.get("date") || "")),
      period: String(data.get("period") || ""),
      notes: String(data.get("notes") || "").trim()
    };

    const message = [
      "Olá! Gostaria de consultar um agendamento no Pet em Casa 🐾",
      "",
      "*Responsável:* " + details.ownerName,
      "*WhatsApp para retorno:* " + details.phone,
      "*Nome do pet:* " + details.petName,
      "*Pet:* " + details.species,
      "*Porte:* " + details.size,
      "*Serviço:* " + details.service,
      "*Data desejada:* " + details.date,
      "*Período:* " + details.period,
      details.notes ? "*Observações:* " + details.notes : ""
    ].filter(Boolean).join("\n");

    const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
    if (cleanNumber.length >= 10) {
      const url = "https://wa.me/" + cleanNumber + "?text=" + encodeURIComponent(message);
      showFeedback("Tudo certo! Vamos abrir o WhatsApp para você revisar e enviar sua solicitação. O agendamento só fica confirmado após o retorno da equipe.");
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      showFeedback("Seu formulário está preenchido e validado, mas o WhatsApp oficial ainda não foi configurado. Nenhuma solicitação foi enviada ou salva. Configure WHATSAPP_NUMBER no arquivo script.js para ativar o envio.", "error");
    }
  });
}
