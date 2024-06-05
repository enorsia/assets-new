// navber scoll
const navbar = document.getElementById("navbar");
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        if (navbar) {
            navbar.style.top = "-200px";
        }
    } else {
        if (navbar) {
            navbar.style.top = "0px";
        }
    }
    prevScrollpos = currentScrollPos;
};

//tooltip
const tooltips = document.querySelectorAll(".tooltips");
tooltips.forEach((t) => {
    new bootstrap.Tooltip(t);
});

// search select field

const selectBox = document.querySelector(".select-box");
const selectOption = document.querySelector(".select-option");
const soValue = document.querySelector("#soValue");
const optionSearch = document.querySelector("#optionSearch");
const options = document.querySelector(".options");
const optionslist = document.querySelectorAll(".options li");

if (selectOption) {
    selectOption.addEventListener("click", function () {
        selectBox.classList.toggle("active");
    });
}


optionslist.forEach(function (optionsListSingle) {
    optionsListSingle.addEventListener("click", function () {
        text = this.textContent;
        soValue.value = text;
        selectBox.classList.remove("active");
    });
});

if (optionSearch) {
    optionSearch.addEventListener("keyup", function () {
        let filter;
        let li;
        let textValue;
        filter = optionSearch.value.toUpperCase();
        li = options.getElementsByTagName("li");
        for (let i = 0; i < li.length; i++) {
            liCount = li[i];
            textValue = liCount.textContent || liCount.innerText;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    });
}

// product quantity increment
function quantityIncrement(e) {
    const getSubTotalProductPrice =
        document.querySelectorAll(".product-subtotal");

    const subTotalProductPrice = document.getElementById("subtotal-productPrice");

    const totalPrice = document.getElementById("total-productPrice");

    const quantity =
        e.parentElement.parentElement.parentElement.children[2].children[0]
            .children[1];

    const productPriceValue =
        e.parentElement.parentElement.parentElement.children[1].children[0]
            .children[0];

    const totalSubtotalValue =
        e.parentElement.parentElement.parentElement.children[3].children[0]
            .children[0];

    quantity.value++;

    const productPrice =
        parseFloat(quantity.value) * parseFloat(productPriceValue.innerHTML);
    totalSubtotalValue.innerHTML = productPrice.toFixed(2);

    let priceArr = [];
    for (let price of getSubTotalProductPrice) {
        priceArr.push(parseFloat(price.innerHTML));
    }

    // sub total price increment
    const subTotalPrice = priceArr.reduce((r, c) => r + c, 0);

    subTotalProductPrice.innerHTML = subTotalPrice.toFixed(2);

    // total price
    totalPrice.innerHTML = subTotalPrice.toFixed(2);
}

// product quantity decrement
function quantityDecrement(e) {
    const quantity =
        e.parentElement.parentElement.parentElement.children[2].children[0]
            .children[1];

    const getsubTotalProductPrice = document.getElementById(
        "subtotal-productPrice"
    );

    const totalPrice = document.getElementById("total-productPrice");

    const productPriceValue =
        e.parentElement.parentElement.parentElement.children[1].children[0]
            .children[0];
    const getSubTotalProductPrice =
        e.parentElement.parentElement.parentElement.children[3].children[0]
            .children[0];

    if (quantity.value <= 0) {
        quantity.value = 0;
        alert("negative value not allow");
    } else {
        quantity.value--;

        const subTotalProductPrice =
            parseFloat(getSubTotalProductPrice.innerHTML) -
            parseFloat(productPriceValue.innerHTML);
        getSubTotalProductPrice.innerHTML = subTotalProductPrice.toFixed(2);

        // decrement subtotal price
        const decrementSubtotalPrice =
            parseFloat(getsubTotalProductPrice.innerHTML) -
            parseFloat(productPriceValue.innerHTML);

        getsubTotalProductPrice.innerHTML = decrementSubtotalPrice.toFixed(2);

        totalPrice.innerHTML = decrementSubtotalPrice.toFixed(2);
    }
}

// active color
// $(document).ready(function () {
//     $(".products-color").click(function () {
//         $(".products-color").removeClass("color-active");
//         $(this).closest(".products-color").addClass("color-active");
//     });
// });

//active size
// $(document).ready(function () {
//     $(".product-sizes").click(function () {
//         $(".product-sizes").removeClass("size-selected");
//         $(this).closest(".product-sizes").addClass("size-selected");
//     });
// });
