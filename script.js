(() => {
  "use strict";
  const $ = (selector, root=document) => root.querySelector(selector);
  const menuButton = $(".menu-toggle");
  const nav = $(".nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(opened));
      menuButton.setAttribute("aria-label", opened ? "Fechar menu" : "Abrir menu");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  // Brand mark always returns to the absolute top, including when the URL has a hash.
  document.querySelectorAll(".brand").forEach(brand => {
    brand.addEventListener("click", event => {
      const href = brand.getAttribute("href");
      if (href === "/" || href === "#top") {
        event.preventDefault();
        if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
        window.scrollTo({top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
        nav?.classList.remove("open");
        menuButton?.setAttribute("aria-expanded", "false");
      }
    });
  });

  const bill = $("#bill"), range = $("#bill-range");
  const saving = $("#saving"), current = $("#current"), percent = $("#percent");
  const annual = $("#annual"), fill = $("#bar-fill"), send = $("#send-sim");
  const money = value => new Intl.NumberFormat("pt-BR", {
    style: "currency", currency: "BRL", maximumFractionDigits: 0
  }).format(value);

  function updateCalculator(rawValue, source) {
    const parsed = Number(String(rawValue ?? "").replace(",", "."));
    const amount = Number.isFinite(parsed) ? Math.max(0, Math.min(1000000, parsed)) : 0;
    const estimate = amount * 0.8;
    if (source !== "bill" && bill) bill.value = amount ? String(amount) : "";
    if (source !== "range" && range) range.value = String(Math.min(5000, Math.max(100, amount || 100)));
    if (saving) saving.textContent = money(estimate);
    if (current) current.textContent = money(amount);
    if (percent) percent.textContent = amount > 0 ? "até 80%" : "—";
    if (annual) annual.textContent = money(estimate * 12);
    if (fill) fill.style.width = (amount > 0 ? 80 : 0) + "%";
    return amount;
  }

  if (bill && range) {
    bill.addEventListener("input", () => updateCalculator(bill.value, "bill"));
    range.addEventListener("input", () => updateCalculator(range.value, "range"));
    bill.addEventListener("change", () => {
      const value = updateCalculator(bill.value, "bill");
      bill.value = value ? String(value) : "";
    });
    updateCalculator(bill.value || 450, "init");
  }

  if (send) send.addEventListener("click", () => {
    const amount = updateCalculator(bill?.value || 0, "bill");
    if (!amount) {
      bill?.focus();
      bill?.setCustomValidity("Informe o valor aproximado da sua conta de energia.");
      bill?.reportValidity();
      bill?.addEventListener("input", () => bill.setCustomValidity(""), {once:true});
      return;
    }
    const message = `Olá! Fiz uma simulação no site da Solar Energia Solar. Minha conta de energia fica em torno de ${money(amount)} por mês. Gostaria de receber uma avaliação e um orçamento para meu imóvel. Pode me orientar?`;
    const whatsappUrl = "https://wa.me/5534986422806?text=" + encodeURIComponent(message);
    const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = whatsappUrl;
  });

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Reveal content without hiding it if IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }), {threshold: 0.08});
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }
})();
