import { BlogPost } from "./components/BlogPost.js";
import { API_URL } from './config.js';

const endpoint = `${API_URL}`;

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const container = document.getElementById("post-container");

  if (!id || !container) {
    container.innerHTML = "<p>Invalid search.</p>";
    return;
  }

  try {
    const res = await fetch(`${endpoint}/posts`);
    const posts = await res.json();
    // Find post where id matches AND publish is true
    const match = posts.find(p => String(p.id) === id);

    if (!match) {
      container.innerHTML = "<p>Post not found.</p>";
      return;
    }
    
    if (!match.publish) {
      container.innerHTML = "<p>Post not published.</p>";
      return;
    }

    const postElement = BlogPost(match);
    container.innerHTML = "";
    container.appendChild(postElement);
  } catch (err) {
    container.innerHTML = "<p>Error loading post.</p>";
    console.error(err);
  }
});

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('post-container');
  
    // Wait until the blog post has been appended before fading in
    setTimeout(() => {
      container.classList.add('visible');
    }, 100); // small delay to ensure content is rendered
  });
  