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

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initActiveNav();
  initPortfolioFilters();
  initBeforeAfterSliders();
});
