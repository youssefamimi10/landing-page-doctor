const DEFAULT_BOOKING_URL = "http://cabinet-dr-moussa-ezzahraoui-3041ea.localtest.me";

const bookingIframe = document.getElementById("booking-embed");
const bookingStatus = document.getElementById("embed-status");
const openBookingLink = document.getElementById("open-booking");

function normalizeUrl(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function getBookingUrlFromQuery() {
  const pageUrl = new URL(window.location.href);
  const queryUrl = pageUrl.searchParams.get("bookingUrl") || pageUrl.searchParams.get("booking");
  return normalizeUrl(queryUrl) || DEFAULT_BOOKING_URL;
}

function setBookingUrl(url) {
  const bookingUrl = normalizeUrl(url);

  if (!bookingUrl) {
    bookingStatus.textContent = "URL de reservation invalide.";
    return;
  }

  bookingIframe.src = bookingUrl;
  openBookingLink.href = bookingUrl;
  bookingStatus.textContent = "Chargement du formulaire de reservation...";
}

function bindEvents() {
  bookingIframe.addEventListener("load", () => {
    bookingStatus.textContent =
      "Formulaire charge. Si votre navigateur bloque l'iframe, utilisez le bouton nouvel onglet.";
  });
}

function bootstrap() {
  bindEvents();
  setBookingUrl(getBookingUrlFromQuery());
}

bootstrap();
