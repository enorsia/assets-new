
let superZoomContainer = document.querySelector(".super-zoom-container");
let value = { current: 1, change: 1, isCurrentValue: true };
let zoomSlideIndex = 1;

function superZoomWindowClose() {
    superZoomContainer.style.display = "none";
}

// const viewBtn = document.querySelectorAll(".product-view-btn");
// viewBtn.forEach(function (btn) {
//     btn.addEventListener("click", function () {
//         superZoomContainer.style.display = "block";
//     });
// });

function superZoomBtn(e) {
    e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].style.display = "block";

    if(value.isCurrentValue){
        currentSuperImage(value?.change);
    }else{
        currentSuperImage(value?.current);
    }
}
// ==========================================


function handleCurrentValue(n) {
    value.current = n;
    value.isCurrentValue = false;
}
function handleChangeValue(n) {
    value.change = n;
    value.isCurrentValue = true;
}

/*========================
super zoom image
=========================*/
showSuperImage(zoomSlideIndex);

// Next/previous controls
function plusZoomSlides(n) {
    showSuperImage((zoomSlideIndex += n));
}
// Thumbnail image controls
function currentSuperImage(n) {
    showSuperImage((zoomSlideIndex = n));
}

function showSuperImage(n) {
    let i;
    let superLargeImg = document.getElementsByClassName("super-large-img");
    let superSmallImg = document.getElementsByClassName("super-small-img");
    if (n > superLargeImg.length) {
        zoomSlideIndex = 1;
    }
    if (n < 1) {
        zoomSlideIndex = superLargeImg.length;
    }
    for (i = 0; i < superLargeImg.length; i++) {
        superLargeImg[i].style.display = "none";
        superLargeImg[i].children[0].className = superLargeImg[i].children[0].className.replace(
            "zoom-img",
            ""
        );
    }
    for (i = 0; i < superSmallImg.length; i++) {
        superSmallImg[i].className = superSmallImg[i].className.replace(" super-active", "");
    }
    superLargeImg[zoomSlideIndex - 1].style.display = "block";
    superSmallImg[zoomSlideIndex - 1].className += " super-active";
}
// ==================================================

// small image slider
let smImgContainer = document.querySelector(".single-product-img");
let smImgNextBtn = document.querySelector(".sm-img-next");
let smImgPrevBtn = document.querySelector(".sm-img-prev");
let lrgImgNextBtn = document.querySelector(".product-btn-next");
let lrgImgPrevBtn = document.querySelector(".product-btn-prev");

let newArrNext = [];
let newArrPrev = [];

smImgNextBtn.addEventListener("click", function () {
    newArrNext.push(smImgContainer.scrollTop);
    if (newArrNext.length > smImgContainer.children.length - 1) {
        smImgContainer.scrollTo(0, 0);
        newArrNext = [];
    } else {
        smImgContainer.scrollBy(0, 85);
    }
});

smImgPrevBtn.addEventListener("click", function () {
    newArrPrev.push(smImgContainer.scrollTop);
    if (newArrPrev.length == 1) {
        smImgContainer.scrollTo(0, 190);
    } else if (newArrPrev.length > smImgContainer.children.length) {
        smImgContainer.scrollTo(0, 190);
        newArrPrev = [0];
    } else {
        smImgContainer.scrollBy(0, -190);
    }
});

lrgImgNextBtn.addEventListener("click", function () {
    newArrNext.push(smImgContainer.scrollTop);
    if (newArrNext.length > smImgContainer.children.length - 1) {
        smImgContainer.scrollTo(0, 0);
        newArrNext = [];
    } else {
        smImgContainer.scrollBy(0, 85);
    }
});

lrgImgPrevBtn.addEventListener("click", function () {
    newArrPrev.push(smImgContainer.scrollTop);
    if (newArrPrev.length == 1) {
        smImgContainer.scrollTo(0, 190);
    } else if (newArrPrev.length > smImgContainer.children.length) {
        smImgContainer.scrollTo(0, 190);
        newArrPrev = [0];
    } else {
        smImgContainer.scrollBy(0, -190);
    }
});
// ==================================================
