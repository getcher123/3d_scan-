function qs(root, sel) {
  return (root || document).querySelector(sel);
}

function qsa(root, sel) {
  return Array.from((root || document).querySelectorAll(sel));
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function initMobileMenu() {
  const btn = qs(document, "[data-menu-button]");
  const menu = qs(document, "[data-menu]");
  if (!btn || !menu) return;

  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    menu.classList.toggle("hidden", !open);
    menu.classList.toggle("is-open", open);
  };

  setOpen(false);

  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  // Close on navigation (mobile)
  qsa(menu, "a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });
}

function initActiveNav() {
  const page = document.body?.dataset?.page;
  if (!page) return;
  const navKey = page === "case" ? "portfolio" : page;
  const links = qsa(document, `[data-nav="${navKey}"]`);
  if (!links.length) return;

  links.forEach((link) => {
    link.setAttribute("aria-current", "page");
  });
}

function initPortfolioFilters() {
  const root = qs(document, "[data-portfolio]");
  if (!root) return;

  const buttons = qsa(root, "[data-filter]");
  const cards = qsa(root, "[data-card]");
  if (!buttons.length || !cards.length) return;

  const setActive = (filter) => {
    buttons.forEach((btn) => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    cards.forEach((card) => {
      const cat = card.dataset.category;
      const show = filter === "all" || cat === filter;
      card.classList.toggle("hidden", !show);
    });
  };

  const initial = buttons.find((b) => b.classList.contains("is-active"))?.dataset.filter || "all";
  setActive(initial);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => setActive(btn.dataset.filter || "all"));
  });
}

function initBeforeAfterSliders() {
  qsa(document, "[data-ba]").forEach((root) => {
    const before = qs(root, "[data-ba-before]");
    const handle = qs(root, "[data-ba-handle]");
    if (!before || !handle) return;

    const initial = Number(root.getAttribute("data-ba-initial"));
    const initialPct = Number.isFinite(initial) ? clamp(initial, 0, 100) : 50;

    const setPct = (pct) => {
      const p = clamp(pct, 0, 100);
      before.style.clipPath = `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
      handle.style.left = `${p}%`;
    };

    setPct(initialPct);

    let dragging = false;

    const onPointer = (e) => {
      const rect = root.getBoundingClientRect();
      const x = clamp(e.clientX - rect.left, 0, rect.width);
      const pct = (x / rect.width) * 100;
      setPct(pct);
    };

    root.addEventListener("pointerdown", (e) => {
      dragging = true;
      root.setPointerCapture(e.pointerId);
      onPointer(e);
    });
    root.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      onPointer(e);
    });
    root.addEventListener("pointerup", () => {
      dragging = false;
    });
    root.addEventListener("pointercancel", () => {
      dragging = false;
    });
  });
}

function getMetaContent(name) {
  const el = qs(document, `meta[name="${name}"]`);
  return el && typeof el.content === "string" ? el.content.trim() : "";
}

function initMapEmbeds() {
  const embedUrl = getMetaContent("scanlab:map-embed-url");
  if (!embedUrl) return;

  qsa(document, "[data-map]").forEach((root) => {
    const iframe = qs(root, "[data-map-iframe]");
    const placeholder = qs(root, "[data-map-placeholder]");
    if (!iframe) return;

    iframe.setAttribute("src", embedUrl);
    iframe.classList.remove("hidden");
    placeholder && placeholder.classList.add("hidden");
  });
}

function initLeadForms() {
  const endpoint = getMetaContent("scanlab:form-endpoint");

  qsa(document, "[data-lead-form]").forEach((form) => {
    const scope = form.closest("[data-form-scope]") || form.parentElement || document;
    const views = qsa(scope, "[data-form-view]");
    const submitBtn = qs(form, 'button[type="submit"]');

    const setView = (name) => {
      views.forEach((v) => {
        const active = v.getAttribute("data-form-view") === name;
        v.classList.toggle("hidden", !active);
        v.classList.toggle("is-active", active);
      });
    };

    qsa(scope, "[data-form-reset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        form.reset();
        setView("form");
      });
    });

    setView("form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (typeof form.reportValidity === "function" && !form.reportValidity()) return;

      const data = new FormData(form);
      const payload = {
        name: String(data.get("name") || "").trim(),
        contact: String(data.get("contact") || "").trim(),
        service: String(data.get("service") || "").trim(),
        details: String(data.get("details") || "").trim(),
        page: String(window.location && window.location.href ? window.location.href : ""),
        ts: new Date().toISOString(),
      };

      if (submitBtn) submitBtn.disabled = true;
      form.setAttribute("aria-busy", "true");

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15_000);

        let ok = true;
        if (endpoint) {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
            signal: controller.signal,
          });
          ok = !!res && res.ok;
        } else {
          // Stub mode: keep UX consistent without delivery.
          await new Promise((r) => setTimeout(r, 500));
        }

        clearTimeout(timeout);

        if (!ok) {
          setView("error");
          return;
        }
        setView("success");
      } catch {
        setView("error");
      } finally {
        form.removeAttribute("aria-busy");
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initActiveNav();
  initPortfolioFilters();
  initBeforeAfterSliders();
  initMapEmbeds();
  initLeadForms();
});
