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

  // --- HERO NAME INTERACTIVE GREETING ANIMATION ---
  const heroName = document.getElementById("heroName");
  if (heroName) {
    // Initial friendly greeting pop
    setTimeout(() => {
      heroName.classList.add("animate-pop");
      setTimeout(() => heroName.classList.remove("animate-pop"), 800);
    }, 600);

    // On-click / on-tap trigger
    heroName.addEventListener("click", () => {
      heroName.classList.remove("animate-pop");
      void heroName.offsetWidth; // Force reflow to restart animation
      heroName.classList.add("animate-pop");
      setTimeout(() => heroName.classList.remove("animate-pop"), 800);
    });
  }

  // --- THEME TOGGLE (Dark / Light) ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeTooltip = document.getElementById("theme-tooltip");

  const themes = ["dark", "light"];

  const themeConfig = {
    dark: {
      icon: "fas fa-moon",
      name: "Theme: Dark",
      apply: () => {
        document.body.classList.add("dark");
      },
    },
    light: {
      icon: "fas fa-sun",
      name: "Theme: Light",
      apply: () => {
        document.body.classList.remove("dark");
      },
    },
  };

  const applyTheme = (themeName) => {
    const config = themeConfig[themeName] || themeConfig.dark;
    config.apply();
    if (themeIcon) themeIcon.className = config.icon;
    if (themeTooltip) themeTooltip.textContent = config.name;
    localStorage.setItem("theme", themeName);
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: themeName } }));
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

  // --- COPY CONTACT VALUE HANDLER ---
  document.querySelectorAll(".contact-copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const copyText = btn.getAttribute("data-copy");
      if (!copyText) return;

      const handleSuccess = () => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied';
        btn.classList.add("copied");
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove("copied");
        }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText).then(handleSuccess).catch(() => {
          fallbackCopy(copyText, handleSuccess);
        });
      } else {
        fallbackCopy(copyText, handleSuccess);
      }
    });
  });

  const fallbackCopy = (text, callback) => {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    if (callback) callback();
  };

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

  // --- AMBIENT FLOATING MICRO-DOTS BACKGROUND ---
  const initBgDots = () => {
    const canvas = document.getElementById("bgDotsCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let animationFrameId = null;
    let isRunning = false;
    let mouseX = -9999;
    let mouseY = -9999;
    let mousePresent = false;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const isDarkMode = () => document.body.classList.contains("dark");

    const getPalette = () => {
      if (isDarkMode()) {
        return [
          { r: 240, g: 246, b: 255, baseAlpha: 0.22 }, // faint starlight white
          { r: 56, g: 189, b: 248, baseAlpha: 0.26 },  // faint electric cyan
          { r: 148, g: 163, b: 184, baseAlpha: 0.16 }, // faint muted slate
        ];
      } else {
        return [
          { r: 30, g: 41, b: 59, baseAlpha: 0.14 },    // faint dark slate
          { r: 2, g: 132, b: 199, baseAlpha: 0.16 },   // faint sky blue
          { r: 100, g: 116, b: 139, baseAlpha: 0.12 }, // faint cool grey
        ];
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Balanced organic density: ~30 dots on mobile, ~65 on desktop
      const targetCount = Math.min(85, Math.max(30, Math.floor((width * height) / 25000)));

      if (particles.length === 0) {
        particles = createParticles(targetCount);
      } else if (particles.length < targetCount) {
        const extra = createParticles(targetCount - particles.length);
        particles.push(...extra);
      } else if (particles.length > targetCount) {
        particles.length = targetCount;
      }
    };

    const createParticles = (count) => {
      const palette = getPalette();
      const newParticles = [];

      for (let i = 0; i < count; i++) {
        const colorDef = palette[Math.floor(Math.random() * palette.length)];
        const radius = 0.6 + Math.random() * 0.7;
        const speed = 0.04 + Math.random() * 0.07;
        const angle = Math.random() * Math.PI * 2;

        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: radius,
          colorDef: colorDef,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.006 + Math.random() * 0.010,
        });
      }

      return newParticles;
    };

    const updatePalette = () => {
      const palette = getPalette();
      particles.forEach((p, index) => {
        p.colorDef = palette[index % palette.length];
      });
    };

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mousePresent = true;
    }, { passive: true });

    document.addEventListener("mouseleave", () => {
      mousePresent = false;
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render floating micro-dots
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion.matches) {
          p.x += p.vx;
          p.y += p.vy;

          // Gentle organic repulsion from mouse point
          if (mousePresent) {
            const mdx = p.x - mouseX;
            const mdy = p.y - mouseY;
            const dist = Math.hypot(mdx, mdy);
            const repelRadius = 80;
            if (dist < repelRadius && dist > 0.1) {
              const force = (1 - dist / repelRadius) * 1.1;
              p.x += (mdx / dist) * force;
              p.y += (mdy / dist) * force;
            }
          }

          // Seamless boundary wrapping
          if (p.x < -10) p.x = width + 10;
          else if (p.x > width + 10) p.x = -10;

          if (p.y < -10) p.y = height + 10;
          else if (p.y > height + 10) p.y = -10;

          p.pulsePhase += p.pulseSpeed;
        }

        // Very soft natural breathing opacity
        const pulse = 0.85 + 0.15 * Math.sin(p.pulsePhase);
        const alpha = Math.min(1, Math.max(0, p.colorDef.baseAlpha * pulse));

        ctx.fillStyle = `rgba(${p.colorDef.r}, ${p.colorDef.g}, ${p.colorDef.b}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!isRunning) return;
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!isRunning) {
        isRunning = true;
        loop();
      }
    };

    const stop = () => {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    resize();
    draw();

    if (!prefersReducedMotion.matches) {
      start();
    }

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        draw();
      }, 150);
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stop();
      } else if (!prefersReducedMotion.matches) {
        start();
      }
    });

    window.addEventListener("themechange", () => {
      updatePalette();
      draw();
    });
  };

  // --- MOUSE POINTER TRAILING LINE & BUNCH OF DOTS ---
  const initCursorTrail = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouchDevice || prefersReducedMotion.matches) return;

    const canvas = document.getElementById("cursorTrailCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let mouseX = -100;
    let mouseY = -100;
    let hasMoved = false;
    let lastMoveTime = 0;
    let trailAlpha = 0;
    let animId = null;

    const isDarkMode = () => document.body.classList.contains("dark");

    const getTrailColor = () => {
      return isDarkMode() 
        ? { r: 56, g: 189, b: 248 }   // electric cyan in dark mode
        : { r: 2, g: 132, b: 199 };   // crisp sky blue in light mode
    };

    let color = getTrailColor();

    const DOT_COUNT = 16;
    const dots = Array.from({ length: DOT_COUNT }, () => ({ x: -100, y: -100 }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        for (let i = 0; i < dots.length; i++) {
          dots[i].x = mouseX;
          dots[i].y = mouseY;
        }
      }

      lastMoveTime = performance.now();
      trailAlpha = 1;
    }, { passive: true });

    document.addEventListener("mouseleave", () => {
      trailAlpha = 0;
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const now = performance.now();
      // Gracefully fade away when mouse is stationary
      if (now - lastMoveTime > 85) {
        trailAlpha = Math.max(0, trailAlpha - 0.05);
      }

      if (trailAlpha > 0.01 && hasMoved) {
        // Update kinematic dots chain
        let tx = mouseX;
        let ty = mouseY;
        for (let i = 0; i < dots.length; i++) {
          dots[i].x += (tx - dots[i].x) * 0.42;
          dots[i].y += (ty - dots[i].y) * 0.42;
          tx = dots[i].x;
          ty = dots[i].y;
        }

        // 1. Draw sleek trailing line connecting cursor through dots
        if (dots.length > 2) {
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          for (let i = 0; i < dots.length - 1; i++) {
            const xc = (dots[i].x + dots[i + 1].x) / 2;
            const yc = (dots[i].y + dots[i + 1].y) / 2;
            ctx.quadraticCurveTo(dots[i].x, dots[i].y, xc, yc);
          }
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${(0.42 * trailAlpha).toFixed(3)})`;
          ctx.lineWidth = 1.6;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }

        // 2. Draw bunch of trailing dots with size & opacity taper
        for (let i = 0; i < dots.length; i++) {
          const progress = 1 - (i / dots.length);
          const radius = 0.8 + progress * 2.2;
          const alpha = (0.15 + progress * 0.80) * trailAlpha;
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(dots[i].x, dots[i].y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    window.addEventListener("themechange", () => {
      color = getTrailColor();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (animId) cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(draw);
      }
    });
  };

  initBgDots();
  initCursorTrail();
});
