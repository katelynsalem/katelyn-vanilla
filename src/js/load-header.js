// js/load-header.js

import { renderHeader, initHeaderEvents } from './components/header.js';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("site-header");
  if (container) {
    container.innerHTML = renderHeader();

    // Initialize event listeners for hamburger components after header is rendered
    initHeaderEvents();

    // Optional: Toggle menu logic for mobile
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-menu");
    toggle?.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});