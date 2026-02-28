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
    "https://staticmap.openstreetmap.de/staticmap.php?center=-27.502216,-55.101156&zoom=16&size=1200x700&markers=-27.502216,-55.101156,red-pushpin"
  ],
  "gal-chacra": [
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-55.255,-27.128,-55.216,-27.087&bboxSR=4326&size=1200,800&imageSR=4326&format=jpg&f=image",
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=-55.249,-27.122,-55.223,-27.094&bboxSR=4326&size=1200,800&imageSR=4326&format=jpg&f=image",
    "https://staticmap.openstreetmap.de/staticmap.php?center=-27.1073742,-55.2356613&zoom=13&size=1200x700&markers=-27.1073742,-55.2356613,red-pushpin"
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
  footer.textContent = `© ${new Date().getFullYear()} GKACHELE | Todos los derechos reservados. Codigo y contenido: propiedad intelectual. Contacto: ${email}`;
}
