/* ================= SAFE DOM LOAD ================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ================= MICRO INTERACTION ================= */
  document.querySelectorAll('.micro-btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = "translateY(-2px)";
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = "translateY(0)";
    });
  });

  /* ================= COUNTER EFFECT ================= */
  const counters = document.querySelectorAll('.counter');
  const statsSection = document.querySelector('.stats');

  if (statsSection && counters.length) {
    let started = false;

    const runCounter = () => {
      if (started) return;
      started = true;

      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const numberEl = counter.querySelector('.number');

        let count = 0;
        const speed = target / 100;

        const update = () => {
          count += speed;
          if (count < target) {
            numberEl.innerText = Math.floor(count);
            requestAnimationFrame(update);
          } else {
            numberEl.innerText = target;
          }
        };
        update();
      });
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) runCounter();
      });
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  }

  /* ================= NAVBAR SCROLL ================= */
  const navbar = document.querySelector(".glass-nav");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  /* ================= VIDEO ================= */
  const video = document.getElementById("mainVideo");
  const playPause = document.getElementById("playPause");
  const centerPlay = document.getElementById("centerPlay");

  if (video) {
    function togglePlay() {
      if (video.paused) {
        video.play();
        if (playPause) playPause.textContent = "⏸";
        if (centerPlay) centerPlay.style.display = "none";
      } else {
        video.pause();
        if (playPause) playPause.textContent = "▶";
        if (centerPlay) centerPlay.style.display = "flex";
      }
    }

    playPause?.addEventListener("click", togglePlay);
    centerPlay?.addEventListener("click", togglePlay);
  }

  /* ================= FAQ ================= */
  const faqTabs = document.querySelectorAll(".faq-tab");
  const faqItems = document.querySelectorAll(".accordion-item");

  faqTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      faqTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-category");

      faqItems.forEach(item => {
        item.classList.add("d-none");
        item.querySelector(".accordion-collapse")?.classList.remove("show");
      });

      let first = true;

      faqItems.forEach(item => {
        if (item.getAttribute("data-category") === category) {
          item.classList.remove("d-none");

          if (first) {
            item.querySelector(".accordion-collapse")?.classList.add("show");
            first = false;
          }
        }
      });
    });
  });

  /* ================= DROPDOWN ================= */
  const dropdown = document.querySelector('.nav-item.dropdown');
  const menu = dropdown?.querySelector('.dropdown-menu');
  const courseLink = dropdown?.querySelector('.nav-link');

  if (dropdown && menu && courseLink) {
    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth > 992) menu.classList.add("show");
    });

    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth > 992) menu.classList.remove("show");
    });

    courseLink.addEventListener("click", (e) => {
      e.preventDefault();

      const target = document.querySelector("#course");
      if (target) {
        window.scrollTo({
          top: target.offsetTop - (navbar?.offsetHeight || 0),
          behavior: "smooth"
        });
      }

      if (window.innerWidth <= 992) {
        menu.classList.toggle("show");
      }
    });
  }

});

/* ================= CURSOR ================= */
const cursor = document.querySelector(".custom-cursor");
const dot = document.querySelector(".cursor-dot");

if (cursor && dot) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
}

/* ================= SWIPER ================= */
if (typeof Swiper !== "undefined") {
  new Swiper(".courseSwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
}