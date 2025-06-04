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

    const recent = posts.filter(post => post.publish).slice(0, 5);

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
      const previewText = post.content?.en
      ? post.content.en.slice(0, 125) + (post.content.en.length > 125 ? `<a href="/post.html?id=${post.id}">[...]</a>` : '')
      : '';    
      el.innerHTML = `
        <div class="recent-posts-content-wrapper">
            <div class="recent-posts-title">
              <h2><a href="/post.html?id=${post.id}">${post.title.en}</a></h2>
            </div>
            <div class="recent-posts-category recent-posts-data">/’${post.category}’/</div>
            <div class="recent-posts-date recent-posts-data">${post.date}</div>
            <div class="recent-posts-tags recent-posts-data">${post.tags.map(tag => `#${tag}`).join(' ')}</div>
              ${post.imageUrl 
                ? `<div class="recent-posts-image-wrapper">
                    <a href="/post.html?id=${post.id}"><img class="recent-posts-image" src="${post.imageUrl}" alt="${post.title.en}" /></a>
                  </div>
                  <div class="recent-posts-image-preview"><p>${previewText}</p></div>` 
                : `<div class="recent-posts-preview"><p>${previewText}</p></div>`
              }
        </div>
      `;
      container.appendChild(el);
    });
  }

  // ${post.content.ko
  //   ? `<div class="recent-posts-korean recent-posts-data">/’한국어로도’/</div>`
  //   : ``
  // }