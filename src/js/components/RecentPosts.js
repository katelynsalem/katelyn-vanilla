import { API_URL } from './config.js';

export async function renderRecentPosts(containerSelector) {
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

    const recent = posts.slice(0, 2);
    container.innerHTML = "";
  
    const heading = document.createElement("h2");
    heading.textContent = "Recent Posts...";
    container.appendChild(heading);
  
    recent.forEach(post => {
      const el = document.createElement("article");
      el.classList.add("recent-post");
      el.innerHTML = `
        <h3>${post.title}</h3>
        <div class="post-meta">
          <span>${post.date}</span>
          <span>${post.tags.map(tag => `#${tag}`).join(' ')}</span>
        </div>
        <img src="${post.thumbnail}" alt="${post.title}" />
      `;
      container.appendChild(el);
    });
  }

  