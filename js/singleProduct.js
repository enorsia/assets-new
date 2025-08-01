/*========================
Slider image
=========================*/
let currentValue = 1;
let changeValue = 1;
let largeImg = document.getElementsByClassName("img-slide");

let slideIndex = 1;
showSlides(slideIndex);

document.addEventListener('swiped', function (e) {
    console.log(e.target);
    console.log(e.detail.dir);
});

// Next/previous controls
function plusSlides(n) {
    if ((n < 0 && slideIndex <= 1) || (n > 0 && slideIndex >= largeImg.length)) {
        return; // Prevent out-of-bound navigation
    }
    showSlides(slideIndex += n);
    plusZoomSlides(n);
    handleChangeValue(slideIndex);
    updateArrowColors();
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
    currentSuperImage(n);
    currentValue = n;
    handleCurrentValue(currentValue);
    updateArrowColors();
}

function showSlides(n) {
    let slides = document.getElementsByClassName("img-slide");
    let dots = document.getElementsByClassName("small-img");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].children[0].className = slides[i].children[0].className.replace(" large-img", "");
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    const media = (e) => {
        if (slides[slideIndex - 1].children[0].className.includes("large-img")) {
            slides[slideIndex - 1].children[0].className = slides[slideIndex - 1].children[0].className.replace(" large-img", "");
        }
        if (e.matches) {
            slides[slideIndex - 1].children[0].className += " large-img";
        }
    };

    const mqLarge = window.matchMedia("(min-width: 992px)");
    media(mqLarge);
    mqLarge.addEventListener("change", media);

    if (slides[slideIndex - 1].children[0].className.includes("large-img")) {
        jQuery(function () {
            $(".large-img").imagezoomsl({
                zoomrange: [4, 4],
                magnifiersize: [640, 545],
                scrollspeedanimate: 10,
                loopspeedanimate: 5,
                magnifycursor: "move",
                cursorshadeopacity: 0.6,
                cursorshadeborder: "1px solid gray",
                magnifiereffectanimate: "showIn",
            });
        });
    }

    updateArrowColors();
}

function updateArrowColors() {
    const prevArrowIcon = document.querySelector("#prevArrow i");
    const nextArrowIcon = document.querySelector("#nextArrow i");

    const inactiveColor = "rgba(146, 146, 146, 0.5)";
    const activeColor = "";

    if (slideIndex <= 1) {
        prevArrowIcon.style.color = inactiveColor;
    } else {
        prevArrowIcon.style.color = activeColor;
    }

    if (slideIndex >= largeImg.length) {
        nextArrowIcon.style.color = inactiveColor;
    } else {
        nextArrowIcon.style.color = activeColor;
    }
}

/*==========================
Product img view slide
===========================*/
const allImgs = document.querySelectorAll(".carousel-item");
const imgView = document.querySelector(".img-view");
const imgBox = document.querySelector(".img-box");
const sliderOptions = document.querySelector(".slider-options");
const bigSliderPrevBtn = document.querySelector(".carousel-control-prev");
const bigSliderNextBtn = document.querySelector(".carousel-control-next");
let sliderCurrentImgCount = document.querySelector(".slider-current-img-count");
let sliderTotalImgCount = document.querySelector(".slider-total-img-count");

let currentImgIdx = 0;

if (sliderTotalImgCount) {
    sliderTotalImgCount.innerText = allImgs.length;
}

if (imgView) {
    imgView.addEventListener("click", function () {
        this.style.display = "none";
        imgBox.style.display = "none";
        sliderOptions.classList.replace("d-block", "d-none");
        bigSliderPrevBtn.classList.replace("d-block", "d-none");
        bigSliderNextBtn.classList.replace("d-block", "d-none");
    });
}

if (bigSliderPrevBtn) {
    bigSliderPrevBtn.addEventListener("click", function () {
        currentImgIdx--;
        if (currentImgIdx === 0) {
            currentImgIdx = allImgs.length;
        }
        sliderCurrentImgCount.innerText = currentImgIdx;
    });
}

if (bigSliderNextBtn) {
    bigSliderNextBtn.addEventListener("click", function () {
        currentImgIdx++;
        if (currentImgIdx > allImgs.length) {
            currentImgIdx = 1;
        }
        sliderCurrentImgCount.innerText = currentImgIdx;
    });
}

function bigSlideClose() {
    imgView.style.display = "none";
    imgBox.style.display = "none";
    sliderOptions.classList.replace("d-block", "d-none");
    bigSliderPrevBtn.classList.replace("d-block", "d-none");
    bigSliderNextBtn.classList.replace("d-block", "d-none");
}

/*================================
Related product slider
================================*/
function nextItem(e) {
    let relProdMain = e.parentElement.children[0];
    let relProd = relProdMain.getElementsByClassName("related-product");
    relProdMain.append(relProd[0]);
}

function prevItem(e) {
    let relProdMain = e.parentElement.children[0];
    let relProd = relProdMain.getElementsByClassName("related-product");
    relProdMain.prepend(relProd[relProd.length - 1]);
}
