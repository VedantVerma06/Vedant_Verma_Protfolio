const roles = [
  "AI Developer",
  "Full Stack Engineer",
  "Problem Solver",
  "Creative Technologist"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();

const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  scrollProgress.style.width = `${scrollPercent}%`;

  if (scrollTop > 450) {
    backToTop.classList.add("show-top");
  } else {
    backToTop.classList.remove("show-top");
  }

  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 170;
    const sectionHeight = section.offsetHeight;

    if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:vedantverma0406@gmail.com?subject=${subject}&body=${body}`;

  contactForm.reset();
});

const revealElements = document.querySelectorAll(
  ".card, .project-card, .timeline-item, .about-box, .contact-box"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});