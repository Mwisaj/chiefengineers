
  const slider = document.querySelector(".project-slider");
  const slides = document.querySelectorAll(".project-slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  let index = 0;
  const slidesToShow = window.innerWidth >= 768 ? 3 : 1;

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (index < slides.length - slidesToShow) {
      index++;
    } else {
      index = 0;
    }
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
    } else {
      index = slides.length - slidesToShow;
    }
    updateSlider();
  });

  // 🔄 Auto-slide every 4 seconds
  setInterval(() => {
    nextBtn.click();
  }, 4000);

