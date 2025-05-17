import { BlogPost } from "./components/BlogPost.js";
import { API_URL } from './config.js';

const endpoint = `${API_URL}`;

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const container = document.getElementById("post-container");

  if (!id || !container) {
    container.innerHTML = "<p>Post not found.</p>";
    return;
  }

  try {
    const res = await fetch(`${endpoint}/posts`);
    const posts = await res.json();
    // Find post where slug matches AND publish is true
    const post = posts.find(p => p.slug === slug && p.publish === true);

    if (!post) {
      container.innerHTML = "<p>Post not found.</p>";
      return;
    }

    const postElement = BlogPost(post);
    container.innerHTML = "";
    container.appendChild(postElement);
  } catch (err) {
    container.innerHTML = "<p>Error loading post.</p>";
    console.error(err);
  }
});
