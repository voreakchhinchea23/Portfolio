// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }
});

// Form submission
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! I will get back to you soon.");
  e.target.reset();
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for items
      setTimeout(() => {
        entry.target.classList.add("fade-in");
      }, index * 100);
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(
    ".section-title, .resume-item, .project-card, .contact-item"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector(".hero-content");
  const heroImage = document.querySelector(".hero-profile-image");

  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - scrolled / 600;
  }

  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Add hover effect to navbar items
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
  });
  link.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

(function () {
  emailjs.init("Vx4Qw62kx9gvgKgd2"); // public key
})();

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const statusDiv = document.getElementById("form-status");
    const submitBtn = this.querySelector('button[type="submit"]');

    statusDiv.textContent = "Sending...";
    statusDiv.style.color = "blue";
    submitBtn.disabled = true;

    const timeInput = document.createElement("input");
    timeInput.type = "hidden";
    timeInput.name = "time";
    timeInput.value = new Date().toLocaleString();
    this.appendChild(timeInput);

    emailjs.sendForm("service_4sy5p79", "template_n382ch3", this).then(
      function () {
        statusDiv.textContent = "✓ Message sent successfully!";
        statusDiv.style.color = "green";
        document.getElementById("contactForm").reset();
        submitBtn.disabled = false;
      },
      function (error) {
        statusDiv.textContent = "✗ Failed to send. Please try again.";
        statusDiv.style.color = "red";
        submitBtn.disabled = false;
        console.error("EmailJS Error:", error);
      }
    );
  });
