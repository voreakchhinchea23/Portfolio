// Initialize EmailJS
(function () {
  emailjs.init("Vx4Qw62kx9gvgKgd2");
})();

document.addEventListener("DOMContentLoaded", () => {
  // --- BOTTOM DOCK SLIDE IN ---
  const dock = document.getElementById("dock");
  if (dock) {
    setTimeout(() => {
      dock.classList.add("visible");
    }, 300);
  }

  // --- SMOOTH SCROLLING ---
  document.querySelectorAll('.dock-item[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // --- INTERSECTION OBSERVER FOR FADE-UP ---
  const observerOptions = {
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // Animates only once
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-up").forEach((el) => {
    observer.observe(el);
  });

  // --- EXPANDABLE TIMELINE ITEMS (Work / Education) ---
  document.querySelectorAll(".timeline-title").forEach((title) => {
    title.setAttribute("tabindex", "0");
    title.setAttribute("role", "button");
    title.addEventListener("click", () => {
      const item = title.closest(".timeline-item");
      if (item) {
        // Toggle this item
        item.classList.toggle("expanded");
        
        // Optional: Collapse other items in the same section (accordion style)
        // const siblings = item.parentNode.querySelectorAll('.timeline-item');
        // siblings.forEach(sib => {
        //   if (sib !== item) sib.classList.remove('expanded');
        // });
      }
    });
    title.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        title.click();
      }
    });
  });

  // --- SKILL PROFICIENCY POPOVERS ---
  const skillPills = document.querySelectorAll(".skill-pill[data-level]");
  skillPills.forEach((skill) => {
    skill.setAttribute(
      "aria-label",
      `${skill.textContent.trim()}: ${skill.dataset.level}% proficiency`
    );
    skill.style.setProperty("--skill-level", `${skill.dataset.level}%`);

    const popover = document.createElement("span");
    popover.className = "skill-popover";
    popover.setAttribute("aria-hidden", "true");
    popover.innerHTML = `
      <span>${skill.dataset.level}% Proficiency</span>
      <span class="skill-progress">
        <span class="skill-progress-fill"></span>
      </span>
    `;
    skill.appendChild(popover);

    skill.addEventListener("click", () => {
      const willOpen = !skill.classList.contains("is-active");
      skillPills.forEach((item) => item.classList.remove("is-active"));
      if (willOpen) skill.classList.add("is-active");
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".skill-pill")) {
      skillPills.forEach((skill) => skill.classList.remove("is-active"));
    }
  });

  // --- PROFILE TECHNOLOGY ORBIT (touch support) ---
  const profileOrbit = document.getElementById("profileOrbit");
  profileOrbit?.addEventListener("click", () => {
    profileOrbit.classList.toggle("orbit-active");
  });

  profileOrbit?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      profileOrbit.classList.toggle("orbit-active");
    }
  });

  // --- THEME TOGGLE (Light / Dark) ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Load saved theme or default to dark mode (popular developer style)
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeIcon.className = "fas fa-sun"; // Sun icon to switch to light
  } else {
    document.body.classList.remove("dark");
    themeIcon.className = "fas fa-moon"; // Moon icon to switch to dark
  }

  themeToggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    
    if (isDark) {
      localStorage.setItem("theme", "dark");
      themeIcon.className = "fas fa-sun";
    } else {
      localStorage.setItem("theme", "light");
      themeIcon.className = "fas fa-moon";
    }
  });

  // --- EMAILJS CONTACT FORM ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const statusDiv = document.getElementById("form-status");
      const submitBtn = document.getElementById("submitBtn");

      statusDiv.textContent = "Sending message...";
      statusDiv.style.color = "var(--muted-foreground)";
      submitBtn.disabled = true;

      emailjs.send("service_4sy5p79", "template_n382ch3", {
        name: this.user_name.value,
        message: this.message.value,
        reply_to: this.reply_to.value,
        time: new Date().toLocaleString(),
      })
      .then(() => {
        statusDiv.textContent = "✓ Message sent successfully!";
        statusDiv.style.color = "green";
        this.reset();
        submitBtn.disabled = false;
        setTimeout(() => {
          statusDiv.textContent = "";
        }, 5000);
      })
      .catch((err) => {
        console.error(err);
        statusDiv.textContent = "✗ Failed to send message. Please email directly.";
        statusDiv.style.color = "red";
        submitBtn.disabled = false;
      });
    });
  }
});
