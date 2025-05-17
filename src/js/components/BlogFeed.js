import { API_URL } from './config.js';

export async function renderBlogFeed(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
  
    const endpoint = `${API_URL}/posts`;

    let posts = [];
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Failed to fetch posts');
      posts = await res.json();
    } catch (err) {
      console.error('Error fetching recent posts:', err);
    }
    
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
  