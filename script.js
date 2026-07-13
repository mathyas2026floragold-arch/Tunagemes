const revealTargets = document.querySelectorAll(
  ".feature, .package, .expert-photo, .expert-copy, .faq-list details, .testimonials-grid article, .football-copy, .football-card"
);

revealTargets.forEach((target) => target.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealTargets.forEach((target) => observer.observe(target));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".draggable-scroll").forEach((scroller) => {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  scroller.addEventListener("pointerdown", (event) => {
    isDown = true;
    scroller.classList.add("dragging");
    scroller.setPointerCapture(event.pointerId);
    startX = event.clientX;
    scrollLeft = scroller.scrollLeft;
  });

  scroller.addEventListener("pointermove", (event) => {
    if (!isDown) return;
    event.preventDefault();
    const walk = (event.clientX - startX) * 1.35;
    scroller.scrollLeft = scrollLeft - walk;
  });

  const stopDragging = () => {
    isDown = false;
    scroller.classList.remove("dragging");
  };

  scroller.addEventListener("pointerup", stopDragging);
  scroller.addEventListener("pointercancel", stopDragging);
  scroller.addEventListener("mouseleave", stopDragging);
});
