// src/js/components/HamburgerMenu.js
export function HamburgerMenu() {
    const container = document.createElement("div");
    container.id = 'hamburger-menu';

    container.innerHTML = `
    <div class="menu-wrapper">
        <ul>
            <li><a href="#travel">Travel</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </div>
`   ;

    return container;
}