/*
 * Pet em Casa
 * Configure o WhatsApp oficial abaixo no formato internacional, apenas números.
 * Exemplo fictício: "5551999999999". Não use um número de exemplo em produção.
 */
const WHATSAPP_NUMBER = ""; // Fallback: configure pelo painel ou preencha este valor.

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const bookingForm = document.querySelector("#booking-form");
const bookingDate = document.querySelector("#booking-date");
const serviceSelect = document.querySelector("#service-select");
const feedback = document.querySelector("#booking-feedback");
const DEFAULT_SITE_CONTENT = {
  whatsappNumber: WHATSAPP_NUMBER,
  gallery: [
    { image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=85", alt: "Cachorrinho recebendo carinho", eyebrow: "CARINHO EM CADA DETALHE", title: "Um cuidado cheio de amor", description: "Nosso compromisso é deixar cada pet confortável e bem cuidado." },
    { image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=85", alt: "Cachorro feliz", eyebrow: "BELEZA E BEM-ESTAR", title: "Prontinho para brilhar", description: "Banho e tosa pensados para respeitar o jeitinho de cada pet." },
    { image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800&q=85", alt: "Cachorro recebendo cuidados", eyebrow: "NOSSO JEITO DE CUIDAR", title: "Pequenos momentos, muito amor", description: "Um atendimento atencioso para pets e suas famílias." }
  ],
  services: [
    { title: "Banho & cheirinho", description: "Um banho gostoso para renovar o pelo e deixar aquele cheirinho irresistível.", image: "🫧", eyebrow: "01 / FRESQUINHO" },
    { title: "Tosa com cuidado", description: "Conforto, higiene e um visual caprichado, respeitando as necessidades do seu pet.", image: "✂️", eyebrow: "02 / ESTILOSO" },
    { title: "Cuidados especiais", description: "Um tempinho extra de atenção para seu companheiro se sentir bem e seguro.", image: "🐾", eyebrow: "03 / BEM-CUIDADO" }
  ]
};
function readSiteContent() {
  try {
    const saved = JSON.parse(localStorage.getItem("petEmCasaContent") || "null");
    return saved && typeof saved === "object" ? { ...DEFAULT_SITE_CONTENT, ...saved } : DEFAULT_SITE_CONTENT;
  } catch { return DEFAULT_SITE_CONTENT; }
}
function renderShowcase() {
  const grid = document.querySelector("#showcase-grid");
  const content = readSiteContent();
  if (grid && Array.isArray(content.gallery)) {
    grid.innerHTML = "";
    content.gallery.forEach((item) => {
      const card = document.createElement("article");
      card.className = "showcase-card";
      const img = document.createElement("img");
      img.src = item.image || "";
      img.alt = item.alt || item.title || "Foto do mostruário Pet em Casa";
      img.loading = "lazy";
      img.onerror = () => { img.alt = "Imagem indisponível. Edite o endereço da foto no painel."; img.removeAttribute("src"); };
      const body = document.createElement("div");
      const eyebrow = document.createElement("span"); eyebrow.textContent = item.eyebrow || "NOSSO TRABALHO";
      const title = document.createElement("h3"); title.textContent = item.title || "Cuidado pet";
      const desc = document.createElement("p"); desc.textContent = item.description || "";
      body.append(eyebrow, title, desc); card.append(img, body); grid.append(card);
    });
  }
  const serviceCards = document.querySelectorAll(".service-card");
  if (Array.isArray(content.services)) {
    serviceCards.forEach((card, index) => {
      const item = content.services[index];
      if (!item) return;
      const numberLabel = card.querySelector(".service-number");
      const title = card.querySelector("h3");
      const description = card.querySelector("p");
      const illustration = card.querySelector(".service-illustration");
      if (numberLabel) numberLabel.textContent = item.eyebrow || "";
      if (title) title.textContent = item.title || "";
      if (description) description.textContent = item.description || "";
      if (illustration && item.image) {
        const firstTextNode = [...illustration.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
        if (firstTextNode) firstTextNode.textContent = item.image;
      }
    });
  }
  const number = String(content.whatsappNumber || "").replace(/\D/g, "");
  if (number.length >= 10) {
    document.querySelectorAll(".floating-whatsapp").forEach((link) => {
      link.href = "https://wa.me/" + number;
      link.target = "_blank"; link.rel = "noopener noreferrer";
    });
  }
}
renderShowcase();

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

    const siteContent = readSiteContent();
    const cleanNumber = String(siteContent.whatsappNumber || WHATSAPP_NUMBER).replace(/\D/g, "");
    if (cleanNumber.length >= 10) {
      const url = "https://wa.me/" + cleanNumber + "?text=" + encodeURIComponent(message);
      showFeedback("Tudo certo! Vamos abrir o WhatsApp para você revisar e enviar sua solicitação. O agendamento só fica confirmado após o retorno da equipe.");
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      showFeedback("Seu formulário está preenchido e validado, mas o WhatsApp oficial ainda não foi configurado. Nenhuma solicitação foi enviada ou salva. Configure WHATSAPP_NUMBER no arquivo script.js para ativar o envio.", "error");
    }
  });
}
