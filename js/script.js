document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card');
  
    const observerOptions = {
      threshold: 0.5 // Trigger when 50% of the card is visible
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, observerOptions);
  
    cards.forEach(card => {
      observer.observe(card);
    });


    const imageSection = document.getElementById('cards');  
    const nextSection = document.getElementById('next-section');  
    const gambar = document.querySelectorAll('.card2');  
    const title = document.querySelector('.title');  
    const scrollIndicator = document.getElementById('scroll-indicator');  
    let currentIndex = 0;  
    let isScrollingEnabled = true;  
    let lastScrollTime = 0;  
    let scrollTimeout;  

    function easeInOutCubic(t) {  
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;  
    }  

    function updateImage(fromIndex, toIndex, progress) {  
      const totalImages = card2.length;  
      const easedProgress = easeInOutCubic(progress);  
      
      gambar.forEach((img, i) => {  
        let opacity = 0;  
        let transform = 'translateZ(-50px)';  
        
        if (i === fromIndex) {  
          opacity = 1 - easedProgress;  
          transform = `translateZ(${-50 * easedProgress}px)`; 
        } else if (i === toIndex) {  
          opacity = easedProgress;  
          transform = `translateZ(${50 - 50 * easedProgress}px)`;
        }  
        
        img.style.opacity = opacity;  
        img.style.transform = transform;  
      });  

      title.textContent = `Image ${toIndex + 1}`;
      title.style.opacity = easedProgress;  
    }  

    function animateScroll(fromIndex, toIndex) {  
      const startTime = performance.now();  
      const duration = 600; // Increased duration for smoother transition  

      function animate(currentTime) {  
        const elapsed = currentTime - startTime;  
        const progress = Math.min(elapsed / duration, 1);  

        updateImage(fromIndex, toIndex, progress);  

        if (progress < 1) {  
          requestAnimationFrame(animate);  
        } else {  
          currentIndex = toIndex;  
          if (currentIndex === cards.length - 1) {  
            scrollIndicator.textContent = 'Scroll to next section';  
          } else {  
            scrollIndicator.textContent = 'Scroll to navigate';  
          }  
        }  
      }  

      requestAnimationFrame(animate);  
    }  

    function handleScroll(event) {  
      if (!isScrollingEnabled) return;  
      event.preventDefault();  

      const currentTime = performance.now();  
      if (currentTime - lastScrollTime < 200) return; // Debounce scroll events  
      lastScrollTime = currentTime;  

      clearTimeout(scrollTimeout);  
      scrollTimeout = setTimeout(() => {  
        const direction = event.deltaY > 0 ? 1 : -1;  
        const fromIndex = currentIndex;  
        const toIndex = (currentIndex + direction + gambar.length) % gambar.length;  

        animateScroll(fromIndex, toIndex);  

        if (toIndex === card2.length - 1 && direction > 0) {  
          isScrollingEnabled = false;  
          setTimeout(() => {  
            nextSection.scrollIntoView({ behavior: 'smooth' });  
            setTimeout(() => {  
              isScrollingEnabled = true;  
            }, 1000);  
          }, 600);  
        }  
      }, 50);  
    }  

    imageSection.addEventListener('wheel', handleScroll, { passive: false });  

    window.addEventListener('scroll', () => {  
      const rect = imageSection.getBoundingClientRect();  
      isScrollingEnabled = rect.top <= 0 && rect.bottom > 0;  
    });  

    // Initialize first image  
    updateImage(gambar.length - 1, 0, 1);  
  });
  