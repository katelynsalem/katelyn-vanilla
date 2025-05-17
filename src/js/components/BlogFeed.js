export async function renderBlogFeed(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
  
    const posts = await fetch('/api/posts').then(res => res.json()).catch(() => []);
    const feed = posts.slice(2, 10);
  
    container.innerHTML = "";
  
    const heading = document.createElement("h2");
    heading.textContent = "Feed";
    container.appendChild(heading);
  
    feed.forEach(post => {
      const el = document.createElement("div");
      el.classList.add("blog-feed-entry");
      el.innerHTML = `
        <div class="feed-date">${post.date}</div>
        <div class="feed-title">→ ${post.title}</div>
        <div class="feed-preview">${post.preview}</div>
      `;
      container.appendChild(el);
    });
  }
  