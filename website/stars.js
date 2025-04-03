document.addEventListener("DOMContentLoaded", function () {
  const starsContainer = document.querySelector(".stars");

  function createStars(count) {
    for (let i = 0; i < count; i++) {
      let star = document.createElement("div");
      star.classList.add("star");

      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;

      let size = Math.random() * 3 + 1;

      let duration = Math.random() * 6 + 1;
      let delay = Math.random() * 2;

      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `-${delay}s`;

      starsContainer.appendChild(star);
    }
  }

  createStars(50);
});
