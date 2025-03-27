// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Navbar active class handling
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });

      // Update active class
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Scroll event to update active navigation based on scroll position
  window.addEventListener("scroll", function () {
    let current = "";
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Update scroll indicator based on scroll position
  const scrollIndicator = document.querySelector(".scroll-indicator span");
  const maxHeight = document.body.scrollHeight - window.innerHeight;

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const scrollPercentage = Math.floor((scrollPosition / maxHeight) * 9);

    if (scrollIndicator) {
      scrollIndicator.textContent = scrollPercentage;
    }
  });

  // Set initial scroll indicator value
  if (scrollIndicator) {
    scrollIndicator.textContent = "0";
  }

  // Animation on scroll for service items
  const serviceItems = document.querySelectorAll(".service-item");

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  serviceItems.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform = "translateY(50px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(item);
  });

  // Animation for about section
  const aboutSection = document.querySelector(".about");
  const aboutObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.2 }
  );

  if (aboutSection) {
    aboutObserver.observe(aboutSection);
  }

  // Portfolio filtering functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 500);
        }
      });
    });
  });

  // Set initial state
  portfolioItems.forEach((item) => {
    item.style.opacity = "1";
    item.style.transform = "scale(1)";
    item.style.transition = "all 0.5s ease";
  });
});

// Skills progress animation
function animateSkills() {
  const skillsSection = document.querySelector(".skills-wrapper");
  const skillBars = document.querySelectorAll(".skill-progress");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((bar) => {
            const progress = bar.getAttribute("data-progress");
            bar.style.width = `${progress}%`;
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (skillsSection) {
    observer.observe(skillsSection);
  }
}

// Contact form submission
function setupContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the data to a server
      // For now, let's just show an alert
      alert(`Thank you, ${name}! Your message has been sent.`);

      // Reset the form
      contactForm.reset();
    });
  }
}

// Add these functions to the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  // Existing code

  // New functions
  animateSkills();
  setupContactForm();
});
