/* SCAN.LAB: optional analytics loader (no inline scripts in HTML).
   Config via meta tags:
   - <meta name="scanlab:ya-metrika-id" content="00000000" />
   - <meta name="scanlab:ga-id" content="G-XXXXXXXXXX" />
*/

(function () {
  try {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const host = String(window.location && window.location.hostname ? window.location.hostname : "");
    const protocol = String(window.location && window.location.protocol ? window.location.protocol : "");
    const isLocal =
      protocol === "file:" ||
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".local") ||
      host === "";
    if (isLocal) return;

    if (document.documentElement && document.documentElement.dataset.analyticsLoaded === "1") return;
    if (document.documentElement) document.documentElement.dataset.analyticsLoaded = "1";

    const meta = (name) => {
      const el = document.querySelector(`meta[name="${name}"]`);
      return el && typeof el.content === "string" ? el.content.trim() : "";
    };

    const yaIdRaw = meta("scanlab:ya-metrika-id");
    const gaId = meta("scanlab:ga-id");
    const yaId = yaIdRaw && /^[0-9]{4,}$/.test(yaIdRaw) ? Number(yaIdRaw) : null;

    if (!yaId && !gaId) return;

    const injectScript = (src) =>
      new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.async = true;
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load: ${src}`));
        document.head.appendChild(s);
      });

    if (gaId) {
      // GA4 (gtag)
      window.dataLayer = window.dataLayer || [];
      window.gtag =
        window.gtag ||
        function () {
          // eslint-disable-next-line prefer-rest-params
          window.dataLayer.push(arguments);
        };
      window.gtag("js", new Date());
      window.gtag("config", gaId, { anonymize_ip: true });

      injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`).catch(() => {});
    }

    if (yaId) {
      // Yandex Metrika
      window.ym =
        window.ym ||
        function () {
          // eslint-disable-next-line prefer-rest-params
          (window.ym.a = window.ym.a || []).push(arguments);
        };
      window.ym.l = 1 * new Date();

      injectScript("https://mc.yandex.ru/metrika/tag.js")
        .then(() => {
          try {
            window.ym(yaId, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
            });
          } catch {
            // ignore
          }
        })
        .catch(() => {});
    }
  } catch {
    // never break the page
  }
})();

