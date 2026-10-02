document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav a[href^='#']");

  function updateActiveLink() {
    let current = "";
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.getAttribute("data-count"));
      const suffix = element.getAttribute("data-suffix") || "";
      const duration = 1500;
      let startTime = null;

      function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        element.textContent = Math.floor(progress * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
      observer.unobserve(element);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (counter) {
    counterObserver.observe(counter);
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
