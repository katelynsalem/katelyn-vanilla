
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
    `;

  }

  export function initHeaderEvents() {
    const figure = document.querySelector("figure.js-burger-toggle-colapse-spin");
    if (figure) {
      figure.addEventListener("click", (e) => {
        e.preventDefault();
        figure.classList.toggle("colapse-spin");
      });
    }
  }