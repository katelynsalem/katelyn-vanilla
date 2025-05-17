
export function renderHeader() {
    return `
      <header class="site-header">
          <a href="/index.html" class="logo">katelyn salem</a>
          <nav class="nav">
            <div id="hamburger" class="container">
              <div class="inner">
                <figure class="js-burger-toggle-colapse-spin">
                  <div class="inner">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </figure>
              </div>
            </div>
          </nav>
      </header>

      <div id="menu-overlay" class="menu-overlay">
        <ul>
          <li><a href="/post.html?id=2">Blog</a></li>
        </ul>
      </div>
    `;

  }

  export function initHeaderEvents() {
    const figure = document.querySelector("figure.js-burger-toggle-colapse-spin");
    const menuOverlay = document.getElementById("menu-overlay");
  
    if (figure && menuOverlay) {
      // Toggle menu on hamburger click
      figure.addEventListener("click", (e) => {
        e.preventDefault();
        figure.classList.toggle("colapse-spin");
        menuOverlay.classList.toggle("visible");
      });
  
      // Close menu when a link is clicked
      const menuLinks = menuOverlay.querySelectorAll("a");
      menuLinks.forEach(link => {
        link.addEventListener("click", () => {
          menuOverlay.classList.remove("visible");
          figure.classList.remove("colapse-spin");
        });
      });
    }
  }
  
  