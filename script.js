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

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter();
    }
  });
}, { threshold: 0.4 });

observer.observe(statsSection);


  /* ================= NAVBAR SCROLL ================= */

  const navbar = document.querySelector(".glass-nav");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }


  


  /* ================= VIDEO CONTROLS ================= */

  /* ================= VIDEO CONTROLS ================= */

const video = document.getElementById("mainVideo");
const playPause = document.getElementById("playPause");
const centerPlay = document.getElementById("centerPlay");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const fullscreen = document.getElementById("fullscreen");
const currentTimeDisplay = document.getElementById("currentTime");
const controls = document.getElementById("controls");

if (video) {

  let hideTimeout;

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

  if (playPause) playPause.addEventListener("click", togglePlay);
  if (centerPlay) centerPlay.addEventListener("click", togglePlay);

  video.addEventListener("timeupdate", () => {
    if (!video.duration) return;

    if (progress)
      progress.value = (video.currentTime / video.duration) * 100;

    if (currentTimeDisplay) {
      let minutes = Math.floor(video.currentTime / 60);
      let seconds = Math.floor(video.currentTime % 60);
      currentTimeDisplay.textContent =
        minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }
  });

  if (progress) {
    progress.addEventListener("input", () => {
      if (video.duration)
        video.currentTime = (progress.value / 100) * video.duration;
    });
  }

  if (volume) {
    volume.addEventListener("input", () => {
      video.volume = volume.value;
    });
  }

  if (fullscreen) {
    fullscreen.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        video.parentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  }

  if (controls) {
    video.parentElement.addEventListener("mousemove", () => {
      controls.style.opacity = "1";
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        if (!video.paused) controls.style.opacity = "0";
      }, 2000);
    });
  }

  /* ================= YOUTUBE STYLE VIDEO SWITCH ================= */

  window.switchMainVideo = function (el) {

    const videoSrc = el.getAttribute("data-video");

    if (!videoSrc) return;

    video.src = videoSrc;
    video.load();
    video.play();

    if (playPause) playPause.textContent = "⏸";
    if (centerPlay) centerPlay.style.display = "none";

    // Active highlight (🔥 YouTube feel)
    document.querySelectorAll(".video-item").forEach(item => {
      item.classList.remove("active-video");
    });

    el.classList.add("active-video");
  };

  /* ================= AUTO NEXT VIDEO ================= */

  video.addEventListener("ended", () => {
    const current = document.querySelector(".active-video");
    const next = current?.nextElementSibling;

    if (next) {
      next.click();
    }
  });

  /* ================= DEFAULT ACTIVE ================= */

  document.querySelector(".video-item")?.classList.add("active-video");

}


  /* ================= CHAT BOT ================= */

  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");
  const chatMessages = document.getElementById("chatMessages");

  if (chatInput && sendBtn && chatMessages) {

    function sendMessage() {

      const message = chatInput.value.trim();
      if (!message) return;

      const userMsg = document.createElement("div");
      userMsg.classList.add("user-message");
      userMsg.textContent = message;
      chatMessages.appendChild(userMsg);

      chatInput.value = "";

      const botMsg = document.createElement("div");
      botMsg.classList.add("bot-message");

      const lowerMsg = message.toLowerCase();

      if (lowerMsg.includes("duration")) {
        botMsg.textContent = "Course duration 3 to 6 months hai depending on program.";
      }
      else if (lowerMsg.includes("job")) {
        botMsg.textContent = "Yes! We provide career support & portfolio guidance.";
      }
      else {
        botMsg.textContent = "Great question! Our team will contact you soon.";
      }

      setTimeout(() => {
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 600);
    }

    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", e => {
      if (e.key === "Enter") sendMessage();
    });
  }

});



// FAQ
/* ================= FAQ ================= */

const faqTabs = document.querySelectorAll(".faq-tab");
const faqItems = document.querySelectorAll(".accordion-item");

faqTabs.forEach(tab => {
  tab.addEventListener("click", () => {

    // active tab
    faqTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const category = tab.getAttribute("data-category");

    // hide all
    faqItems.forEach(item => {
      item.classList.add("d-none");

      const collapse = item.querySelector(".accordion-collapse");
      if (collapse) collapse.classList.remove("show");
    });

    // show selected
    let first = true;

    faqItems.forEach(item => {
      if (item.getAttribute("data-category") === category) {
        item.classList.remove("d-none");

        if (first) {
          const collapse = item.querySelector(".accordion-collapse");
          if (collapse) collapse.classList.add("show");
          first = false;
        }
      }
    });

  });
});



// Hover dropdown
document.addEventListener("DOMContentLoaded", function () {

  const dropdown = document.querySelector('.nav-item.dropdown');
  const menu = dropdown.querySelector('.dropdown-menu');
  const courseLink = dropdown.querySelector('.nav-link');

  // DESKTOP HOVER
  dropdown.addEventListener("mouseenter", function () {
    if (window.innerWidth > 992) {
      menu.classList.add("show");
    }
  });

  dropdown.addEventListener("mouseleave", function () {
    if (window.innerWidth > 992) {
      menu.classList.remove("show");
    }
  });

  // CLICK SCROLL (Works All Devices)
  courseLink.addEventListener("click", function (e) {

    e.preventDefault();

    const target = document.querySelector("#course");

    if (target) {
      window.scrollTo({
        top: target.offsetTop - document.querySelector(".navbar").offsetHeight,
        behavior: "smooth"
      });
    }

    // Mobile dropdown toggle
    if (window.innerWidth <= 992) {
      menu.classList.toggle("show");
    }

  });

});


// under line
document.addEventListener("DOMContentLoaded", function () {

  const navbar = document.querySelector(".glass-nav");
  const dropdown = document.querySelector('.nav-item.dropdown');
  const menu = dropdown.querySelector('.dropdown-menu');
  const courseLink = dropdown.querySelector('.nav-link');

  /* ================= SCROLL EFFECT ================= */
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* ================= HOVER (Desktop Only) ================= */
  dropdown.addEventListener("mouseenter", function () {
    if (window.innerWidth > 992) {
      menu.classList.add("show");
    }
  });

  dropdown.addEventListener("mouseleave", function () {
    if (window.innerWidth > 992) {
      menu.classList.remove("show");
    }
  });

  /* ================= CLICK SCROLL ================= */
  courseLink.addEventListener("click", function (e) {

    e.preventDefault();

    const target = document.querySelector("#course");

    if (target) {
      window.scrollTo({
        top: target.offsetTop - navbar.offsetHeight,
        behavior: "smooth"
      });
    }

    /* Mobile dropdown toggle */
    if (window.innerWidth <= 992) {
      menu.classList.toggle("show");
    }

  });

});


// active buttons of syllabus 
const tabs = document.querySelectorAll(".tab-btn");
const currentPage = window.location.pathname;

tabs.forEach(tab => {

    if(tab.getAttribute("href") === currentPage){
        tab.classList.add("active");
    } else {
        tab.classList.remove("active");
    }

});



// corsur
const cursor = document.querySelector(".custom-cursor");
const dot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
});


// Hover on links & buttons
const hoverElements = document.querySelectorAll("a, button");

hoverElements.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

// course slider
const swiper = new Swiper(".courseSwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    grabCursor: true,
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







// google responsive
const scriptURL = "https://script.google.com/macros/s/AKfycbzabNsje_03KdVTJY1NZd55x4jeNYYhJwmfGppliIEGSbbLAm70qFKcJMwvi5ioEgbCEA/exec";

document.querySelectorAll(".submit-btn").forEach(btn => {
  btn.addEventListener("click", async () => {

    const isModal = btn.closest("#enrolModal");

    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Sending...`;
    btn.disabled = true;

    const data = isModal ? {
      name: document.getElementById("modalName").value.trim(),
      email: document.getElementById("modalEmail").value.trim(),
      phone: document.getElementById("modalPhone").value.trim(),
      education: document.getElementById("modalEducation").value.trim(),
      course: document.getElementById("modalCourse").value
    } : {
      name: document.getElementById("contactName").value.trim(),
      email: document.getElementById("contactEmail").value.trim(),
      phone: document.getElementById("contactPhone").value.trim(),
      education: document.getElementById("contactEducation").value.trim(),
      course: document.getElementById("contactService").value
    };

    // 🔴 VALIDATION
    if (!data.name || !data.email || !data.phone || !data.course) {
      showToast("⚠️ Please fill all required fields");

      btn.innerHTML = originalText;
      btn.disabled = false;
      return;
    }

    // 🔴 EMAIL VALIDATION
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      showToast("⚠️ Enter valid email");

      btn.innerHTML = originalText;
      btn.disabled = false;
      return;
    }

    // 🔴 PHONE VALIDATION (10 digit)
    if (data.phone.length < 10) {
      showToast("⚠️ Enter valid phone number");

      btn.innerHTML = originalText;
      btn.disabled = false;
      return;
    }

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        btn.innerHTML = "✅ Submitted";
        showToast("Form submitted successfully 🚀");

        if (isModal) {
          document.querySelectorAll("#enrolModal input, #enrolModal select")
            .forEach(el => el.value = "");
        } else {
          document.querySelector(".contact-form-card").reset();
        }

      } else {
        throw new Error("Failed");
      }

    } catch (error) {
      console.error(error);
      btn.innerHTML = "❌ Failed";
      showToast("Server issue ⚠️");
    }

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 2000);

  });
});

// loder here
function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#000";
  toast.style.color = "#fff";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "8px";
  toast.style.zIndex = "9999";

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}