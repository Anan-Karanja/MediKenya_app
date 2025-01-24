document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navbar = document.querySelector(".navbar");
  const navLinkItems = document.querySelectorAll("#nav-links a"); // Select all nav links

  // Toggle the navigation menu
  menuToggle.addEventListener("click", () => {
    const isActive = menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isActive);
  });

  // Close the menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Add a scroll effect to the navbar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Toggle active state for navigation links
  navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
      // Remove active class from all links
      navLinkItems.forEach((item) => item.classList.remove("active"));

      // Add active class to the clicked link
      link.classList.add("active");

      // Close the menu if it's open (for mobile view)
      if (navLinks.classList.contains("active")) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
  
});
