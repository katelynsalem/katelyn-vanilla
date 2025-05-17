// src/js/main.js
import { BlogPost } from './components/BlogPost.js';
import { NavHead } from './components/NavHead.js';
import { Hamburger } from './components/Hamburger.js';
import { HamburgerMenu } from './components/HamburgerMenu.js';

// Create a container for the blog section
const blogContainer = document.getElementById('blog-container');
const root = document.getElementById('root');
const navbar = document.getElementById('navbar');

// Dynamically add the hamburger menu when the hamburger is clicked
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const hamburger = document.getElementById('hamburger');
  
    // Append the hamburger menu to the header (or another appropriate parent)
    const menu = HamburgerMenu();
    header.appendChild(menu);
  
    // hamburger.addEventListener('click', () => {
    //   menu.classList.toggle('active');
    // });


// Example blog post data
// const blogPost = BlogPost({
//   title: "The Art of Minimalism: A philosophy",
//   date: "2025, May 1",
//   language: "/’한국어로 바꾸기’/",
//   content: "<p>a style or technique that is characterized by extreme spareness and simplicity.The goal of font pairing is to select fonts that share an overarching theme yet have a pleasing contrast.Click (Generate) to create a new font pairing, (Lock) to lock fonts that you want to keep, and (Edit) to choose a font manually. The text is editable, try replacing it with your company name or other copy.</p>",
//   //imageUrl: "../public/images/catPlaceholder.png"
// });

// Append the BlogPost component to the DOM
//root.prepend(NavHead());
//root.appendChild(Hamburger());
//blogContainer.appendChild(blogPost);


  // Load blog posts
  loadBlogPosts();
});

async function loadBlogPosts() {
  try {
    // Example: loading one post
    const response = await fetch('/posts/personal/test-post.json');
    const postData = await response.json();

    const postElement = BlogPost(postData);
    blogContainer.appendChild(postElement);
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
}
