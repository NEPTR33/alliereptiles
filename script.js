////////////////////////
//SMOOTH SCROLL
////////////////////////
const btn1 = document.querySelector(".btn-1");
const formSection = document.querySelector(".form-section");
btn1.addEventListener("click", function (e) {
  formSection.scrollIntoView({ behavior: "smooth" });
  allSections.forEach(function (section) {
    section.classList.remove("section--hidden");
  });
});
////////////////////////
//SLIDER
////////////////////////
const slideContainer = document.getElementById("slides-container");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("btn-left");
const nextBtn = document.getElementById("btn-right");
const dots = document.querySelectorAll(".dot");
let slidePosition = 0;
const updateDots = function () {
  dots.forEach(function (dot, i) {
    if (slidePosition === i) {
      dot.classList.add("dot-fill");
    }
    if (slidePosition != i) {
      dot.classList.remove("dot-fill");
    }
  });
};

dots.forEach(function (dot, i) {
  dot.addEventListener("click", function (e) {
    slidePosition = i;
    goToSlide(i);
    updateDots();
  });
});

const goToSlide = function (slide) {
  slideContainer.style.transform = `translateX(${-150 * slide}%)`;
};

const nextSlide = function () {
  {
    if (slidePosition === slides.length - 1) {
      slidePosition = 0;
    } else {
      slidePosition++;
    }
    slideContainer.style.transform = `translateX(${slidePosition * -150}%)`;
  }
  updateDots();
};

const prevSlide = function () {
  {
    if (slidePosition < 1) {
      slidePosition = 3;
    } else {
      slidePosition--;
    }
    slideContainer.style.transform = `translateX(${slidePosition * -150}%)`;
  }
  updateDots();
};

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

////////////////////////
//SLIDER MOBILE
////////////////////////
const btnLeft = document.querySelector("#btn-left-mobile");
const btnRight = document.querySelector("#btn-right-mobile");
const slidesMobile = document.querySelectorAll(".mobile-slideshow");
let curImg = 0;
const displayImg = function (n) {
  slidesMobile[n].classList.remove("hidden");
};
const removeImg = function (n) {
  slidesMobile[n].classList.add("hidden");
};
const updateImg = function () {
  for (let i = 0; i < slidesMobile.length; i++) {
    if (i === curImg) {
      displayImg(i);
    }
    if (i != curImg) {
      removeImg(i);
    }
  }
};
displayImg(curImg);

btnLeft.addEventListener("click", function (e) {
  curImg--;
  if (curImg < 0) {
    curImg = slidesMobile.length - 1;
  }
  updateImg();
});
btnRight.addEventListener("click", function (e) {
  curImg++;
  if (curImg > slidesMobile.length - 1) {
    curImg = 0;
  }
  updateImg();
});

////////////////////////
//Reveal sections
////////////////////////

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.36,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
