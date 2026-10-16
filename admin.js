const DEFAULT_CONTENT = {
  whatsappNumber: "",
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
const KEY = "petEmCasaContent";
const readContent = () => { try { return { ...DEFAULT_CONTENT, ...(JSON.parse(localStorage.getItem(KEY) || "null") || {}) }; } catch { return structuredClone(DEFAULT_CONTENT); } };
let content = readContent();
const $ = (selector) => document.querySelector(selector);
$("#whatsapp").value = content.whatsappNumber || "";

function element(tag, props = {}, text = "") {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === "className") node.className = value;
    else if (key === "value") node.value = value ?? "";
    else node.setAttribute(key, value);
  });
  if (text) node.textContent = text;
  return node;
}
function makeField(labelText, key, value, multiline = false, placeholder = "") {
  const label = element("label", {}, labelText);
  const input = multiline ? element("textarea", { rows: "3", "data-key": key, placeholder }) : element("input", { type: "text", "data-key": key, value: value || "", placeholder });
  if (multiline) { input.value = value || ""; }
  label.append(input);
  return label;
}
function renderGalleryEditor() {
  const host = $("#gallery-editor"); host.replaceChildren();
  content.gallery.forEach((item, index) => {
    const card = element("article", { className: "editor-item", "data-index": index });
    const img = element("img", { src: item.image || "", alt: item.alt || "Prévia da foto" });
    img.onerror = () => { img.alt = "Não foi possível carregar a prévia"; };
    const fields = element("div", { className: "editor-fields" });
    const url = makeField("Endereço da foto (URL)", "image", item.image, false, "Cole aqui o link direto da imagem");
    url.querySelector("input").addEventListener("input", (e) => { img.src = e.target.value; });
    const row = element("div", { className: "two-col" });
    row.append(makeField("Título", "title", item.title), makeField("Texto pequeno", "eyebrow", item.eyebrow));
    fields.append(url, row, makeField("Descrição", "description", item.description, true), makeField("Texto alternativo da foto", "alt", item.alt));
    const remove = element("button", { type: "button", className: "button button-danger" }, "Remover esta foto");
    remove.addEventListener("click", () => { content.gallery.splice(index, 1); renderGalleryEditor(); });
    fields.append(remove); card.append(img, fields); host.append(card);
  });
}
function renderServicesEditor() {
  const host = $("#services-editor"); host.replaceChildren();
  content.services.forEach((item, index) => {
    const card = element("article", { className: "editor-item", "data-index": index });
    const icon = element("div", { className: "editor-preview" }, item.image || "🐾");
    icon.style.cssText = "display:grid;place-items:center;width:110px;height:110px;border-radius:12px;background:#e3f1e6;font-size:42px";
    const fields = element("div", { className: "editor-fields" });
    fields.append(makeField("Nome do serviço", "title", item.title), makeField("Descrição do serviço", "description", item.description, true));
    card.append(icon, fields); host.append(card);
  });
}
function collectEditor(hostSelector, baseArray) {
  return [...$(hostSelector).querySelectorAll(".editor-item")].map((card, index) => {
    const item = { ...baseArray[index] };
    card.querySelectorAll("[data-key]").forEach((field) => { item[field.dataset.key] = field.value.trim(); });
    return item;
  });
}
function persist() {
  localStorage.setItem(KEY, JSON.stringify(content));
}
renderGalleryEditor(); renderServicesEditor();
$("#site-settings").addEventListener("submit", (event) => {
  event.preventDefault();
  const number = $("#whatsapp").value.replace(/\D/g, "");
  if (number && number.length < 10) { $("#settings-feedback").textContent = "Confira o número. Informe país, DDD e telefone."; return; }
  content.whatsappNumber = number;
  persist();
  $("#settings-feedback").textContent = "Contato salvo neste navegador. Para refletir em outros dispositivos, precisamos conectar um banco de dados.";
});
$("#add-gallery").addEventListener("click", () => {
  content.gallery.push({ image: "", alt: "", eyebrow: "NOSSO TRABALHO", title: "Novo destaque", description: "Adicione uma descrição para este trabalho." });
  renderGalleryEditor();
});
$("#save-gallery").addEventListener("click", () => {
  content.gallery = collectEditor("#gallery-editor", content.gallery);
  persist();
  $("#gallery-feedback").textContent = "Mostruário salvo neste navegador. Abra o site neste mesmo navegador para ver as alterações.";
  renderGalleryEditor();
});
$("#save-services").addEventListener("click", () => {
  content.services = collectEditor("#services-editor", content.services);
  persist();
  $("#services-feedback").textContent = "Descrições salvas neste navegador. A sincronização online ainda precisa ser configurada.";
  renderServicesEditor();
});
$("#reset-content").addEventListener("click", () => {
  if (!confirm("Restaurar o conteúdo inicial neste navegador? Suas personalizações locais serão perdidas.")) return;
  content = structuredClone(DEFAULT_CONTENT); persist();
  $("#whatsapp").value = ""; renderGalleryEditor(); renderServicesEditor();
  $("#settings-feedback").textContent = "Conteúdo inicial restaurado neste navegador.";
});
