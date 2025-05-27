//import { API_URL } from '../config.js';

export async function renderBlogFeed(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
  
    const endpoint = `https://katelyn-vanilla-backend.onrender.com/posts`;

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

  
    feed.forEach(post => {
      const el = document.createElement("article");
      el.classList.add("blog-feed-wrapper");
      el.innerHTML = `
        <div class="blog-feed-content-wrapper">
            <div class="blog-feed-date">${post.date}</div>
            <div class="blog-feed-title"><h2><a href="/post.html?id=${post.id}">→ ${post.title.en}</a></h2></div>
        </div>
      `;
      container.appendChild(el);
    });
  }
  