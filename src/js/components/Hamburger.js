
export function Hamburger() {
    const container = document.createElement("div");
    container.id = 'hamburger';
    container.classList.add("container");

    container.innerHTML = `
		<div class="inner">
			<figure class="js-burger-toggle-colapse-spin">
				<div class="inner">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</figure>
		</div>
`   ;

  // Attach event to <figure> after structure is added
  // Event does the hamburger spin animation
  const figure = container.querySelector("figure");
  figure.addEventListener("click", (e) => {
    e.preventDefault();
    figure.classList.toggle("colapse-spin");
  });

    return container;
}
  