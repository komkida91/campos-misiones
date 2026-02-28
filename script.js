const email = "gkachele91@gmail.com";
const whatsappRaw = "0034671579211";
const whatsappDigits = whatsappRaw.replace(/\D/g, "").replace(/^00/, "");

const links = {
  mailto: `mailto:${email}?subject=${encodeURIComponent("Consulta por propiedades rurales en Misiones")}`,
  whatsapp: `https://wa.me/${whatsappDigits}?text=${encodeURIComponent("Hola, me interesan la hectarea y la chacra en Misiones.")}`
};

[
  "btn-mail-top",
  "btn-mail"
].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = links.mailto;
});

[
  "btn-wa-top",
  "btn-wa"
].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = links.whatsapp;
});

const galleries = {
  "gal-hectarea": [
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
  ],
  "gal-chacra": [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488866022504-f2584929ca5f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80"
  ]
};

Object.entries(galleries).forEach(([id, images]) => {
  const container = document.getElementById(id);
  if (!container) return;

  images.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.loading = "lazy";
    img.alt = `${id} imagen ${idx + 1}`;
    container.appendChild(img);
  });
});

const footer = document.getElementById("footer-text");
if (footer) {
  footer.textContent = `${new Date().getFullYear()} | Campos Misiones | Contacto: ${email}`;
}
