// Google Analytics wird erst nach ausdrücklicher Einwilligung geladen (DSGVO / TTDSG).
// Vorher wird keine Verbindung zu Google aufgebaut und kein Cookie gesetzt.

const GA_ID = "G-6G5MELB99M";
const CONSENT_KEY = "cookiesAccepted";

let loaded = false;

export function hasConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === "true";
  } catch {
    return false;
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value ? "true" : "false");
  } catch {
    /* privater Modus o. Ä.: Entscheidung gilt dann nur für diesen Besuch */
  }
}

export function clearConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignorieren */
  }
}

export function loadAnalytics() {
  window[`ga-disable-${GA_ID}`] = false;
  if (loaded) return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

// Bei Ablehnung oder Widerruf: Tracking abschalten und GA-Cookies entfernen.
export function disableAnalytics() {
  window[`ga-disable-${GA_ID}`] = true;
  const host = location.hostname.replace(/^www\./, "");
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name === "_gat") {
      for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
      }
    }
  });
}

// Öffnet den Cookie-Banner erneut (z. B. über „Cookie-Einstellungen“ im Footer).
export function openCookieSettings() {
  window.dispatchEvent(new Event("open-cookie-settings"));
}
