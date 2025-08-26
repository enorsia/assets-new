
let superZoomContainer = document.querySelector(".super-zoom-container");
let value = { current: 1, change: 1, isCurrentValue: true };
let zoomSlideIndex = 1;

function superZoomWindowClose() {
    const superZoomContainer = document.querySelector(".super-zoom-container");
    if (superZoomContainer) superZoomContainer.style.display = "none";

    // Restore default body scroll
    document.body.style.overflow = "";
}
// const viewBtn = document.querySelectorAll(".product-view-btn");
// viewBtn.forEach(function (btn) {
//     btn.addEventListener("click", function () {
//         superZoomContainer.style.display = "block";
//     });
// });

function superZoomBtn(e) {
    // Show the zoom container
    e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].style.display = "block";

    // Hide default body scroll
    document.body.style.overflow = "hidden";

    // Show the current image
    if (value.isCurrentValue) {
        currentSuperImage(value?.change);
    } else {
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
function smallImageFunc() {
    const smImgContainer = document.querySelector(".single-product-img");
    const smImgNextBtn = document.querySelector(".sm-img-next");
    const smImgPrevBtn = document.querySelector(".sm-img-prev");
    const mainNextBtn = document.getElementById("nextArrow");
    const mainPrevBtn = document.getElementById("prevArrow");

    if (!smImgContainer) return;

    const totalItems = smImgContainer.children.length;
    const containerHeight = smImgContainer.offsetHeight; 
    const itemHeight = smImgContainer.children[0]?.offsetHeight || 127;
    const gap = 10;
    const step = itemHeight + gap;
    const visibleItems = Math.floor(containerHeight / step);

    let currentIndex = 0;

    // Reset transform each time
    smImgContainer.style.transform = "translateY(0)";

    // === update buttons visibility ===
    function updateButtons() {
        if (smImgPrevBtn) {
            smImgPrevBtn.style.display = currentIndex > 0 ? "block" : "none";
        }
        if (smImgNextBtn) {
            smImgNextBtn.style.display = (currentIndex < totalItems - visibleItems) ? "block" : "none";
        }
    }

    // === scroll handler ===
    function updateScroll(direction) {
        if (direction === "down" && currentIndex < totalItems - visibleItems) {
            currentIndex++;
        }
        if (direction === "up" && currentIndex > 0) {
            currentIndex--;
        }
        smImgContainer.style.transform = `translateY(-${currentIndex * step}px)`;
        updateButtons();
    }

    // Reset listeners (clone trick)
    [smImgNextBtn, smImgPrevBtn, mainNextBtn, mainPrevBtn].forEach(btn => {
        if (btn) {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        }
    });

    // Re-select buttons
    const next = document.querySelector(".sm-img-next");
    const prev = document.querySelector(".sm-img-prev");
    const bigNext = document.getElementById("nextArrow");
    const bigPrev = document.getElementById("prevArrow");

    // Attach
    next?.addEventListener("click", () => updateScroll("down"));
    prev?.addEventListener("click", () => updateScroll("up"));
    bigNext?.addEventListener("click", () => updateScroll("down"));
    bigPrev?.addEventListener("click", () => updateScroll("up"));

    // Init buttons correctly
    updateButtons();
}

// Init once on load
smallImageFunc();



// ==================================================
