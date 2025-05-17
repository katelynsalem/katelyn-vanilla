// src/js/effects/TextScramble.js
export class TextScramble {
    constructor(el, frameInterval = 1) {
        this.el = el;
        this.defaultChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // fallback
        this.chars = this.defaultChars;
        this.update = this.update.bind(this);
        this.frameInterval = frameInterval; // number of frames to skip per update
        this.tickCount = 0;
      }
    
      setChars(chars) {
        this.chars = chars;
      }
  
    setText(newText){
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length,newText.length);
      const promise = new Promise((resolve)=>this.resolve = resolve);
  
      this.queue = [];
      for(let i = 0; i < length; i++){
        const from = oldText[i] || '';
        const to  = newText[i] || '';
        const start = Math.floor(Math.random()*40);
        const end = Math.floor(Math.random()*40) + start;
        this.queue.push({from,to,start,end});
      }
  
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.tickCount = 0;
      this.update();
      return promise;
    }
  
    update(){
        // Delay updates based on frameInterval    
        this.tickCount++;
        if (this.tickCount % this.frameInterval !== 0) {
            this.frameRequest = requestAnimationFrame(this.update);
            return;
        }

      let output = '';
      let complete = 0;
      for(let i=0,n=this.queue.length;i<n;i++){
        let {from,to,start,end,char} = this.queue[i];
  
        if(this.frame >= end){
          complete++;
          output += to;
        } else if(this.frame >= start){
          if(!char || Math.random() < 0.28){
            char = this.randomChar();
            this.queue[i].char = char;
          }
          // add in class='dud' if I want the characters to decrease in opacity during scramble like the site title
          output += `<span>${char}</span>`;
        } else {
          output += from;
        }
      }
  
      this.el.innerHTML = output;
  
      if(complete === this.queue.length){
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  
    randomChar(){
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }
  