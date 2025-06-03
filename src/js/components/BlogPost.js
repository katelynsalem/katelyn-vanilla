import { TextScramble } from '../effects/TextScramble.js';

export function BlogPost({ title, language, date, content, imageUrl, footnotes = []  }) {
    const article = document.createElement('article');
    article.classList.add('blog-post');
  
    // Replace <sup data-fn="n"> with numbered links
    const parsedContent = content.en.replace(/<sup data-fn=['"](\d+)['"]><\/sup>/g, (match, number) => {
      const index = parseInt(number) - 1;
      return `<sup id="fnref${number}"><a href="#fn${number}">${number}</a></sup>`;
    });
    article.innerHTML = parsedContent;

    // Create footnotes section if there are footnotes
    let footnotesSection = null;

    if (Array.isArray(footnotes) && footnotes.length) {
      footnotesSection = document.createElement('div');
      footnotesSection.classList.add('footnotes', 'meta-data');
    
      footnotes.forEach((text, i) => {
        const number = i + 1;
        const p = document.createElement('p');
        p.id = `fn${number}`;
        p.innerHTML = `['${number}']`;
        footnotesSection.appendChild(p);
    
        const ptext = document.createElement('p');
        ptext.innerHTML = `${text}`;
        footnotesSection.appendChild(ptext);
      });
    }
    
    


    article.innerHTML = `
      ${imageUrl 
        ? `<div class="post-main-image-wrapper"><img src="${imageUrl}" alt="${title.en} image" class="post-main-image"></div>` 
        : `<div class="post-main-image-placeholder"></div>`
      }
      <div class="post-title-wrapper">
        <h1 class="post-title text-scramble">${title.en}</h1>
      </div>
      <div class="post-language-wrapper">
      </div>
      <p class="post-date meta-data">${date}</p>
      <div class="post-content text-scramble">${parsedContent}</div>
      
    `;

    const titleEl = article.querySelector('.post-title');
    const contentEl = article.querySelector('.post-content');
    const langWrapper = article.querySelector('.post-language-wrapper');

      // Add the toggle button only if Korean content is available
    let postArrow = null;
    let toggleBtn = null;
    if (content.ko) {
      postArrow = document.createElement('span');
      postArrow.classList.add('post-arrow', 'over-left');
      postArrow.innerHTML = "→";
      toggleBtn = document.createElement('button');
      toggleBtn.className = 'post-language-btn';
      toggleBtn.innerHTML = "/’한국어로 바꾸기’/";
      langWrapper.appendChild(postArrow);
      langWrapper.appendChild(toggleBtn);
    }

    //const toggleBtn = article.querySelector('.post-language-btn');
    
    // Scramble instances
    const scrambleTitle = new TextScramble(titleEl);
    const scrambleContent = new TextScramble(contentEl);
    const scrambleButton = new TextScramble(toggleBtn);

    let isEnglish = true;
    
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const newLang = isEnglish ? 'ko' : 'en';

      // Set scrambling chars based on target language
      const koreanChars = 'ㅂㅈㄷㄱㅛㅅㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡㅃㅉㄸㄲㅆㅒㅖ';
      const englishChars = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';

      const scrambleChars = newLang === 'ko' ? koreanChars : englishChars;
      scrambleTitle.setChars(scrambleChars);
      scrambleContent.setChars(scrambleChars);
      scrambleButton.setChars(scrambleChars);


      // Update text with TextScramble
      // First: update title with slight delay for content
      scrambleTitle.setText(title[newLang]);
      setTimeout(() => {

        // Replace footnotes in content before scrambling
        const parsed = content[newLang].replace(/<sup data-fn=['"](\d+)['"]><\/sup>/g, (match, number) => {
          return `<sup id="fnref${number}"><a href="#fn${number}">${number}</a></sup>`;
        });
        
        scrambleContent.setText(parsed);
        scrambleButton.setText(isEnglish ? '/’한국어로 바꾸기’/' : '/’Switch to English’/');
      
        // // Toggle footnotes
        // if (newLang === 'ko') {
        //   if (footnotesSection.parentElement) {
        //     footnotesSection.remove();
        //   }
        // } else if (footnotes.length && !footnotesSection.parentElement) {
        //   article.appendChild(footnotesSection);
        // }

      }, 300); // adjust delay as needed

 
      isEnglish = !isEnglish;
    });
  }

    // Add Footnotes if there are any
    if (footnotesSection) article.appendChild(footnotesSection);

    return article;
  }