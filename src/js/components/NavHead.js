
export function NavHead() {
    const nav = document.createElement("nav");
    nav.classList.add("nav-head");

    const links = [
        { href: "#thoughts", text: "Thoughts" },
        { href: "#travel", text: "Travel" },
        { href: "#study", text: "Study" },
        { href: "#korea", text: "Korea" },
        { href: "#info", text: "Info" },
    ];

    const ul = document.createElement("ul");
    links.forEach(({ href, text }) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = href;
        a.textContent = text;
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    
      // Set initial effects
      requestAnimationFrame(() => applyNavEffects(nav));
    
      // Add click handlers
      ul.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          const clickedLi = e.target.closest("li");
          if (clickedLi && ul.firstChild !== clickedLi) {
            ul.removeChild(clickedLi);
            ul.insertBefore(clickedLi, ul.firstChild);
            applyNavEffects(nav);
          }
        }
      });
    
      return nav;
}

function applyNavEffects(nav) {
    const listItems = nav.querySelectorAll("ul li");
    const totalItems = listItems.length;

    if (totalItems === 0) return;

    //Apply link styles
    const maxFontSize = 1.6;   // rem
    const minFontSize = 1.125; // rem
    const maxSteps = totalItems - 2; // The number of items that need to scale
    const scaleStep = (maxFontSize - minFontSize) / (maxSteps || 1); // Avoid divide by 0

    listItems.forEach((li, index) => {
        const a = li.querySelector("a");
        const rawText = a.getAttribute("data-rawtext") || a.textContent.replace(/\/'?|'?\/$/g, "").replace(/^\/'/, "").replace(/'\/$/, "");

        // Store clean base text in a data attribute once
        if (!a.getAttribute("data-rawtext")) {
        a.setAttribute("data-rawtext", rawText);
        }

        if (index === 0) {
        // First item
        a.textContent = `/’${rawText}’/`;
        a.style.opacity = 1;
        a.style.fontWeight = "400";
        a.style.fontStyle = "normal";
        a.style.fontSize = "2.4rem";
        a.style.fontFamily = "'Work Sans', sans-serif";
        a.style.letterSpacing = "0";

        } else if (index === 1){
        // Second link
        a.textContent = `⭢ ${rawText}/`;
        a.style.fontStyle = "italic";
        a.style.fontSize = `${maxFontSize}rem`;
        a.style.opacity = "0.875";
        a.style.fontFamily = "";
        } else if (index === totalItems - 1){
        // Last link
        a.textContent = `${rawText}/`;
        a.style.fontSize = `${minFontSize}rem`; // Set to minFontSize
        a.style.opacity = "0.4"; // Optionally, decrease opacity for the last item
        a.style.fontFamily = "";
        a.style.fontStyle = "italic";
    } else {
        // Other items, starting from 3rd to second-last
        const scale = (index - 1) * scaleStep; // Scaling factor for intermediate items
        const size = maxFontSize - scale;
        const opacity = 0.7 - (index - 2) * 0.2; // Slight fade for subsequent links

        a.textContent = `${rawText}/`;
        a.style.fontSize = `${Math.max(minFontSize, size)}rem`;
        a.style.opacity = `${opacity}`;
        a.style.fontFamily = "";
        a.style.fontStyle = "italic";
    }
    });
}
