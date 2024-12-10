/*========================
Slider image
=========================*/
let currentValue = 1;
let changeValue = 1;
let largeImg = document.getElementsByClassName("img-slide");

let slideIndex = 1;
showSlides(slideIndex);


document.addEventListener('swiped', function(e) {
    console.log(e.target); // the element that was swiped
    console.log(e.detail.dir); // swiped direction
});
// Next/previous controls
function plusSlides(n) {
    showSlides((slideIndex += n));
    plusZoomSlides(n);
    handleChangeValue(slideIndex);

}
// Thumbnail image controls
function currentSlide(n) {
    showSlides((slideIndex = n));
    currentSuperImage(n);
    currentValue = n;
    handleCurrentValue(currentValue);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("img-slide");
    let dots = document.getElementsByClassName("small-img");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].children[0].className = slides[i].children[0].className.replace(
            " large-img",
            ""
        );
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    // slides[slideIndex - 1].children[0].className += " large-img";

    // set media-query class "large-img" for large device
    const media = (e) => {
        if (slides[slideIndex - 1].children[0].className.includes("large-img")) {
            slides[slideIndex - 1].children[0].className -= " large-img";
        }
        if (e.matches) {
            slides[slideIndex - 1].children[0].className += " large-img";
        }
    };
    const mqLarge = window.matchMedia("(min-width: 992px)");
    media(mqLarge);
    mqLarge.addEventListener("change", media);
    // end media-query

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
}
// ==================================================

/*==============================
product image by color
==============================*/
// const colorSelect = document.querySelector("#form-color-select");
// const imgSelect = document.querySelectorAll("#single-product-img img");

// colorSelect.addEventListener("change", () => {
//   const selectedValue =
//     colorSelect.options[colorSelect.selectedIndex].value.toLowerCase();
//   if (selectedValue) {
//     for (let img of imgSelect) {
//       // find domain
//       const imgUrl = img.src.split("/").slice(0, -1).join("/");
//       // find img color
//       let elements = img.src.split("/").slice(-1)[0].split("-");
//       elements[0] = selectedValue;
//       const result = elements.join("-");
//       img.src = `${imgUrl}/${result}`;
//     }
//   }
// });
// ============================================

/*==========================
product img view slide
===========================*/
// const viewBtn = document.querySelectorAll(".product-view-btn");
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
    sliderTotalImgCount.innerText = allImgs?.length;
}

if (imgView) {
    imgView.addEventListener("click", function () {
        this.style.display = "none";
        imgBox.style.display = "none";

        sliderOptions.classList.remove("d-block");
        sliderOptions.classList.add("d-none");

        bigSliderPrevBtn.classList.remove("d-block");
        bigSliderPrevBtn.classList.add("d-none");
        bigSliderNextBtn.classList.remove("d-block");
        bigSliderNextBtn.classList.add("d-none");
    });
}

// viewBtn.forEach(function (btn, idx) {
//     btn.addEventListener("click", function () {
//         imgView.style.display = "block";
//         imgBox.style.display = "block";

//         sliderOptions.classList.remove("d-none");
//         sliderOptions.classList.add("d-block");

//         bigSliderPrevBtn.classList.remove("d-none");
//         bigSliderPrevBtn.classList.add("d-block");
//         bigSliderNextBtn.classList.remove("d-none");
//         bigSliderNextBtn.classList.add("d-block");
//         currentImgIdx = idx + 1;
//     });
// });
if (bigSliderPrevBtn) {
    bigSliderPrevBtn.addEventListener("click", function () {
        currentImgIdx--;
        if (currentImgIdx === 0) {
            currentImgIdx = allImgs.length;
        }
        sliderCurrentImgCount.innerText = currentImgIdx;
    });
}
if (bigSliderPrevBtn) {
    bigSliderNextBtn.addEventListener("click", function () {
        currentImgIdx++;
        if (currentImgIdx > allImgs.length) {
            currentImgIdx = 1;
        }
        sliderCurrentImgCount.innerText = currentImgIdx;
    });
}

// slider close
function bigSlideClose() {
    imgView.style.display = "none";
    imgBox.style.display = "none";

    sliderOptions.classList.remove("d-block");
    sliderOptions.classList.add("d-none");

    bigSliderPrevBtn.classList.remove("d-block");
    bigSliderPrevBtn.classList.add("d-none");
    bigSliderNextBtn.classList.remove("d-block");
    bigSliderNextBtn.classList.add("d-none");
}
// ==================================================

/*================================
related product slider
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
// ==================================================
