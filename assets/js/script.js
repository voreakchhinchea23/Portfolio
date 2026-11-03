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
        if (item.classList.contains("timeline-cert-item")) {
          const certBtn = item.querySelector(".cert-btn");
          if (certBtn) certBtn.click();
          return;
        }
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

  // --- PROFILE TECHNOLOGY ORBIT & GLITCH AVATAR (hover & touch support) ---
  const profileOrbit = document.getElementById("profileOrbit");
  const avatarFrame = profileOrbit?.querySelector(".avatar-frame");
  let reverseTimer = null;

  if (profileOrbit && avatarFrame) {
    const triggerReverseGlitch = () => {
      avatarFrame.classList.remove("glitch-reverse");
      void avatarFrame.offsetWidth; // Force reflow so animation triggers cleanly
      avatarFrame.classList.add("glitch-reverse");
      clearTimeout(reverseTimer);
      reverseTimer = setTimeout(() => {
        avatarFrame.classList.remove("glitch-reverse");
      }, 700);
    };

    profileOrbit.addEventListener("mouseenter", () => {
      clearTimeout(reverseTimer);
      avatarFrame.classList.remove("glitch-reverse");
    });

    profileOrbit.addEventListener("mouseleave", () => {
      triggerReverseGlitch();
    });

    avatarFrame.addEventListener("animationend", (e) => {
      if (e.target === avatarFrame && avatarFrame.classList.contains("glitch-reverse")) {
        avatarFrame.classList.remove("glitch-reverse");
      }
    });

    profileOrbit.addEventListener("click", () => {
      const wasActive = profileOrbit.classList.contains("orbit-active");
      profileOrbit.classList.toggle("orbit-active");
      if (wasActive) {
        triggerReverseGlitch();
      } else {
        clearTimeout(reverseTimer);
        avatarFrame.classList.remove("glitch-reverse");
      }
    });

    profileOrbit.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        profileOrbit.click();
      }
    });
  }

  // --- THEME TOGGLE (Dark / Light / Liquid Glass) ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeTooltip = document.getElementById("theme-tooltip");

  const themes = ["dark", "light", "glass"];

  const themeConfig = {
    dark: {
      icon: "fas fa-moon",
      name: "Theme: Dark",
      apply: () => {
        document.body.classList.remove("glass");
        document.body.classList.add("dark");
      },
    },
    light: {
      icon: "fas fa-sun",
      name: "Theme: Light",
      apply: () => {
        document.body.classList.remove("dark", "glass");
      },
    },
    glass: {
      icon: "fas fa-droplet",
      name: "Theme: Liquid Glass",
      apply: () => {
        document.body.classList.remove("dark");
        document.body.classList.add("glass");
      },
    },
  };

  const applyTheme = (themeName) => {
    const config = themeConfig[themeName] || themeConfig.dark;
    config.apply();
    if (themeIcon) themeIcon.className = config.icon;
    if (themeTooltip) themeTooltip.textContent = config.name;
    localStorage.setItem("theme", themeName);
  };

  // Load saved theme or default to dark mode
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  themeToggleBtn?.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    applyTheme(nextTheme);
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

  // --- PROJECT IMAGE LIGHTBOX POPUP ---
  const lightbox = document.getElementById("imageLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxBackdrop = lightbox?.querySelector(".lightbox-backdrop");

  if (lightbox && lightboxImg) {
    const openLightbox = (src, alt, title, verifyUrl) => {
      lightboxImg.src = src;
      lightboxImg.alt = alt || title || "Preview";
      if (lightboxCaption) {
        if (verifyUrl) {
          lightboxCaption.innerHTML = `
            <span class="lightbox-caption-text">${title || alt || ""}</span>
            <a href="${verifyUrl}" target="_blank" rel="noopener noreferrer" class="lightbox-verify-btn">
              <i class="fas fa-external-link-alt"></i> Verify Credential
            </a>
          `;
          lightboxCaption.style.display = "flex";
        } else if (title || alt) {
          lightboxCaption.textContent = title || alt || "";
          lightboxCaption.style.display = "block";
        } else {
          lightboxCaption.style.display = "none";
        }
      }
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Prevent background scroll
      lightboxClose?.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      setTimeout(() => {
        if (!lightbox.classList.contains("active")) {
          lightboxImg.src = "";
          if (lightboxCaption) lightboxCaption.innerHTML = "";
        }
      }, 300);
    };

    // Project image triggers
    document.querySelectorAll(".project-img-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault(); // Stop jumping to top of the page
        const img = link.querySelector("img");
        const cardTitle = link.closest(".project-card")?.querySelector(".project-card-title")?.textContent.trim();
        const src = link.getAttribute("href") && link.getAttribute("href") !== "#"
          ? link.getAttribute("href")
          : img?.getAttribute("src");
        const alt = img?.getAttribute("alt");
        if (src) {
          openLightbox(src, alt, cardTitle);
        }
      });
    });

    // Certificate popup button triggers
    document.querySelectorAll(".cert-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const src = btn.getAttribute("data-cert-src");
        const title = btn.getAttribute("data-cert-title");
        const verifyUrl = btn.getAttribute("data-cert-url");
        if (src) {
          openLightbox(src, title, title, verifyUrl);
        }
      });
    });

    // Clicking certificate timeline logo also triggers popup
    document.querySelectorAll(".timeline-cert-item").forEach((item) => {
      const btn = item.querySelector(".cert-btn");
      if (!btn) return;
      const logo = item.querySelector(".timeline-logo");
      if (logo) {
        logo.style.cursor = "pointer";
        logo.setAttribute("title", "Click to view certificate");
        logo.addEventListener("click", () => {
          btn.click();
        });
      }
    });

    lightboxClose?.addEventListener("click", closeLightbox);
    lightboxBackdrop?.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }
});
