(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  const stored = localStorage.getItem("mk-theme");
  if (stored) root.setAttribute("data-theme", stored);
  themeBtn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("mk-theme", next);
  });

  const sections = document.querySelectorAll(".section, .hero");
  sections.forEach((s) => s.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  sections.forEach((s) => io.observe(s));

  document.querySelectorAll(".project").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  const typed = document.getElementById("typed");
  if (typed) {
    const full = typed.textContent;
    typed.textContent = "";
    let i = 0;
    const tick = () => {
      if (i <= full.length) {
        typed.textContent = full.slice(0, i++);
        setTimeout(tick, 70);
      }
    };
    setTimeout(tick, 400);
  }
})();
