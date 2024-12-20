document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navbar = document.querySelector(".navbar");

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
});
