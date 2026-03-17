const defaultSiteConfig = {
  brand: "CAMPOS MISIONES",
  hero_title: "Hectárea en Oberá + Chacra de 25 hectáreas en Jardín América",
  hero_lead: "Oportunidad para inversion, proyecto productivo o desarrollo rural. Informacion clara, contacto directo y coordinacion de visitas.",
  email: "gkachele91@gmail.com",
  whatsapp_raw: "0034671579211",
  whatsapp_message: "Hola, me interesan la hectarea y la chacra en Misiones.",
  instagram_url: "https://www.instagram.com/elanchok",
  facebook_url: "https://www.facebook.com/share/1MxSut1VKh/",
  map1_embed_url: "https://maps.google.com/maps?hl=es&q=-27.502216,-55.101156&z=16&t=k&output=embed",
  map1_link_url: "https://www.google.com/maps?hl=es&q=-27.502216,-55.101156&z=18&t=k",
  map2_embed_url: "https://maps.google.com/maps?hl=es&q=-27.118107,-55.246134&z=13&t=k&output=embed",
  map2_link_url: "https://www.google.com/maps?hl=es&q=-27.118107,-55.246134&z=14&t=k"
};

function normalizeWhatsapp(raw) {
  return String(raw || "").replace(/\D/g, "").replace(/^00/, "");
}

function applyText(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.textContent = value;
}

function applyHref(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.href = value;
}

function applySrc(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.src = value;
}

function applySiteConfig(config) {
  const email = config.email || defaultSiteConfig.email;
  const whatsappRaw = config.whatsapp_raw || defaultSiteConfig.whatsapp_raw;
  const whatsappDigits = normalizeWhatsapp(whatsappRaw);
  const whatsappMessage = config.whatsapp_message || defaultSiteConfig.whatsapp_message;

  const links = {
    mailto: `mailto:${email}?subject=${encodeURIComponent("Consulta por propiedades rurales en Misiones")}`,
    whatsapp: `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(whatsappMessage)}`
  };

  applyText("brand-text", config.brand);
  applyText("hero-title", config.hero_title);
  applyText("hero-lead", config.hero_lead);
  applyText("email-text", email);
  applyText("phone-text", whatsappRaw);

  applyHref("btn-mail-top", links.mailto);
  applyHref("btn-mail", links.mailto);
  applyHref("btn-wa-top", links.whatsapp);
  applyHref("btn-wa", links.whatsapp);
  applyHref("wa-float", links.whatsapp);
  applyHref("card-phone", links.whatsapp);

  applyHref("instagram-link", config.instagram_url);
  applyHref("facebook-link", config.facebook_url);
  applyHref("map1-link", config.map1_link_url);
  applyHref("map2-link", config.map2_link_url);

  applySrc("map1-iframe", config.map1_embed_url);
  applySrc("map2-iframe", config.map2_embed_url);
}

async function loadSiteConfig() {
  try {
    const response = await fetch("/content/site.json", { cache: "no-store" });
    if (!response.ok) return defaultSiteConfig;
    const remoteConfig = await response.json();
    return { ...defaultSiteConfig, ...remoteConfig };
  } catch {
    return defaultSiteConfig;
  }
}

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

const footer = document.getElementById("footer-text");
if (footer) {
  const year = new Date().getFullYear();
  footer.innerHTML = `© ${year} GKACHELE™. Todos los derechos reservados.<br>Desarrollado desde noviembre 2025 por GKACHELE`;
}

loadSiteConfig().then(applySiteConfig);
