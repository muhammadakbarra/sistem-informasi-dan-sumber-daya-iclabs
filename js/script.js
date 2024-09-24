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
  });
  