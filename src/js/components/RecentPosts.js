//import { API_URL } from './config.js';

export async function renderRecentPosts(containerSelector) {
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

    const recent = posts.slice(0, 2);
    container.innerHTML = "";

    // const headingWrapper = document.createElement("div");
    // headingWrapper.classList.add("recent-posts-header-wrapper")
    // const heading = document.createElement("h1");
    // heading.textContent = "Recent Posts...";
    // headingWrapper.appendChild(heading);
    // container.appendChild(headingWrapper);
  
    recent.forEach(post => {
      const el = document.createElement("article");
      el.classList.add("recent-post-wrapper");
      el.innerHTML = `
        <div class="recent-posts-content-wrapper">
            <div class="recent-posts-title">
              <h2><a href="/post.html?id=${post.id}">${post.title.en}</a></h2>
            </div>
            <div class="recent-posts-category recent-posts-data">/'Category'/</div>
            <div class="recent-posts-date recent-posts-data">${post.date}</div>
            <div class="recent-posts-tags recent-posts-data">${post.tags.map(tag => `#${tag}`).join(' ')}</div>
            <div class="recent-posts-image-wrapper">
              <a href="/post.html?id=${post.id}"><img class="recent-posts-image" src="${post.imageUrl}" alt="${post.title.en}" /></a>
            </div>
        </div>
      `;
      container.appendChild(el);
    });
  }

  