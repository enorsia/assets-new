
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

const ThumbScroller = (() => {
  let container, step = 0, visible = 0, total = 0, idx = 0;

  function measure() {
    if (!container) return false;
    total = container.children.length;

    const first = container.children[0];
    if (!first) { step = 0; visible = 0; return false; }

    const rect = first.getBoundingClientRect();
    const cs = getComputedStyle(container);
    const gap = parseFloat(cs.rowGap || cs.gap || 0) || 0;

    step = Math.round(rect.height + gap);
    if (step <= 0) return false;

    visible = Math.max(1, Math.floor(container.clientHeight / step));
    return true;
  }

  function updateButtons() {
    const prevBtn = document.querySelector(".sm-img-prev");
    const nextBtn = document.querySelector(".sm-img-next");

    // Always show arrows
    if (prevBtn) prevBtn.style.display = "block";
    if (nextBtn) nextBtn.style.display = "block";
  }

  function applyTransform() {
    container.style.transform = `translateY(-${idx * step}px)`;
  }

  async function waitForImages() {
    const imgs = container ? container.querySelectorAll("img") : [];
    if (!imgs.length) return;
    await Promise.all([...imgs].map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(res => {
        img.addEventListener("load", res, { once: true });
        img.addEventListener("error", res, { once: true });
      });
    }));
  }

  return {
    init: async function () {
      container = document.querySelector(".single-product-img");
      if (!container) return;

      idx = 0;
      container.style.transform = "translateY(0)";

      await waitForImages();
      if (!measure()) return;

      updateButtons(); // arrows are always visible now
    },

    scroll: function (dir) {
      if (!container || step <= 0) return;
      const maxIdx = Math.max(0, total - visible);

      if (dir === "down" && idx < maxIdx) idx++;
      if (dir === "up" && idx > 0) idx--;

      applyTransform();
      updateButtons();
    }
  };
})();

// Global click delegation
document.addEventListener("click", (e) => {
  if (e.target.closest(".sm-img-next") || e.target.closest("#nextArrow")) {
    ThumbScroller.scroll("down");
  }
  if (e.target.closest(".sm-img-prev") || e.target.closest("#prevArrow")) {
    ThumbScroller.scroll("up");
  }
});

// Init
ThumbScroller.init();





// ==================================================
