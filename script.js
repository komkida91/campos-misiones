const email = "gkachele91@gmail.com";
const whatsappRaw = "0034671579211";
const whatsappDigits = whatsappRaw.replace(/\D/g, "").replace(/^00/, "");
const instagramUrl = "https://www.instagram.com/elanchok?utm_source=qr&igsh=MWk5ZnBwbTR0cnYwNQ==";

const links = {
  mailto: `mailto:${email}?subject=${encodeURIComponent("Consulta por propiedades rurales en Misiones")}`,
  whatsapp: `https://wa.me/${whatsappDigits}?text=${encodeURIComponent("Hola, me interesan la hectarea y la chacra en Misiones.")}`
};

["btn-mail-top", "btn-mail"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = links.mailto;
});

["btn-wa-top", "btn-wa", "wa-float", "card-phone"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = links.whatsapp;
});

const galleries = {
  "gal-hectarea": [
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-55.115,-27.513,-55.086,-27.491&bboxSR=4326&size=1200,800&imageSR=4326&format=jpg&f=image",
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-55.112,-27.509,-55.092,-27.496&bboxSR=4326&size=1200,800&imageSR=4326&format=jpg&f=image",
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-55.109,-27.507,-55.094,-27.497&bboxSR=4326&size=1200,800&imageSR=4326&format=jpg&f=image"
  ],
  "gal-chacra": [
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-55.255,-27.128,-55.216,-27.087&bboxSR=4326&size=1200,800&imageSR=4326&format=jpg&f=image",
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-55.249,-27.122,-55.223,-27.094&bboxSR=4326&size=1200,800&imageSR=4326&format=jpg&f=image",
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-55.244,-27.117,-55.228,-27.100&bboxSR=4326&size=1200,800&imageSR=4326&format=jpg&f=image"
  ]
};

Object.entries(galleries).forEach(([id, images]) => {
  const container = document.getElementById(id);
  if (!container) return;

  images.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.loading = "lazy";
    img.alt = `${id} imagen referencial ${idx + 1}`;
    container.appendChild(img);
  });
});

const instagramLink = document.getElementById("instagram-link");
if (instagramLink) instagramLink.href = instagramUrl;

const phoneText = document.getElementById("phone-text");
if (phoneText) phoneText.textContent = whatsappRaw;

const footer = document.getElementById("footer-text");
if (footer) {
  const year = new Date().getFullYear();
  footer.innerHTML = `© ${year} GKACHELE™. Todos los derechos reservados.<br>Desarrollado desde noviembre 2025 por GKACHELE<br>Código propiedad de GKACHELE © ${year} - Prohibida su reproducción sin autorización`;
}
