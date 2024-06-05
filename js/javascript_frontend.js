//dashboard nav active
const activePage = window.location.pathname;
const navLinks = document
    .querySelectorAll(".dashboard-nav ul li a")
    .forEach((link) => {
        if (link.href.includes(`${activePage}`)) {
            link.classList.add("active-dashboard-nav");
        }
    });

// shopping product calculate

const getTotalPrice = document.querySelectorAll(".total-price");
const getSubTotal = document.getElementById("sub-total");
const getTaxCost = document.getElementById("tax-cost");
const getShippingCost = document.getElementById("shipping-cost");
const getTotalAmount = document.getElementById("total-amount");

function changePrice(design_id, e) {
    let color_id = e.parentElement.parentElement.parentElement.children[1].children[0].value;
    let size_id = e.value;

    getSizeWisePrice(design_id, color_id, size_id).then((data) => {
        let priceHTML = e.parentElement.parentElement.parentElement.children[4].children[0].children[0].children[0];
        priceHTML.innerText = data.price;
        let qtySelect = e.parentElement.parentElement.parentElement.children[3].children[0].children[0];
        qtySelect.selectedIndex = 0;


        qtySelect.innerHTML = "";
        if (data.quantity >= 2) {
            for (let i = 1; i <= 2; i++) {
                let option = document.createElement("option");
                option.value = i;
                option.innerText = i;
                qtySelect.appendChild(option);
            }
        }
        else {
            for (let i = 1; i <= 1; i++) {
                let option = document.createElement("option");
                option.value = i;
                option.innerText = i;
                qtySelect.appendChild(option);
            }
        }

        let orderValue = e.parentElement.parentElement.parentElement.children[5].children[0].children[0].children[0].children[0];
        orderValue.innerText = data.price;

        let priceArr = [];
        for (let price of getTotalPrice) {
            priceArr.push(parseFloat(price.innerText));
        }

        // sub total price
        const subTotal = priceArr.reduce((r, c) => r + c, 0);
        getSubTotal.innerText = subTotal.toFixed(2);

        const totalPriceAmount = subTotal;
        getTotalAmount.innerText = totalPriceAmount.toFixed(2);
    });
}

async function getSizeWisePrice(design_id, color_id, size_id) {
    const response = await fetch(`cart/size-wise-price/${design_id}/${color_id}/${size_id}`);
    const data = await response.json();
    return data;
}

function changeCartColor(e, designId) {
    let color_id = e.value;
    let design_id = designId;

    getColorWiseSizes(design_id, color_id).then((data) => {
        // console.log(`${window.location.origin}/upload/ecom_products/${data.image}`);
        let sizeSelect = e.parentElement.parentElement.children[2].children[0].children[0];
        sizeSelect.innerHTML = "";
        let sizeOption = "<option value=''>Select Size</option>";
        for (let size of data.sizes) {
            sizeOption += `<option value="${size.id}">${size.size}</option>`;
        }
        sizeSelect.innerHTML = sizeOption;
        let imageHtml = e.parentElement.parentElement.children[0].children[0].children[0].children[0];
        imageHtml.src = `${window.location.origin}/upload/ecom_products/${data.image}`;
    });

    let priceHtml = e.parentElement.parentElement.children[4].children[0].children[0].children[0];
    priceHtml.innerText = "-";

    let orderValue = e.parentElement.parentElement.children[5].children[0].children[0].children[0].children[0];
    orderValue.innerText = "-";

    let qtySelect = e.parentElement.parentElement.children[3].children[0].children[0];
    qtySelect.selectedIndex = 0;

    let qtyOption = qtySelect.children[1];
    if (qtyOption) {
        qtyOption.remove();
    }
    getSubTotal.innerText = "-";
    getTotalAmount.innerText = "-";
}

async function getColorWiseSizes(designId, colorId) {
    const response = await fetch(`cart/color-wise-size/${designId}/${colorId}`);
    const data = await response.json();
    return data;
}


function totalPriceCalculate(e) {
    const unitPrice = parseFloat(
        e.parentElement.parentElement.parentElement.children[4].children[0]
            .children[0].children[0].innerText
    );
    const quantity = parseInt(e.value);

    // console.log(e.parentElement.parentElement.parentElement.children[4]);

    let prductPirce =
        e.parentElement.parentElement.parentElement.children[5].children[0]
            .children[0].children[0].children[0];

    prductPirce.innerText = (unitPrice * quantity).toFixed(2);

    let priceArr = [];
    for (let price of getTotalPrice) {
        priceArr.push(parseFloat(price.innerText));
    }

    // sub total price
    const subTotal = priceArr.reduce((r, c) => r + c, 0);
    getSubTotal.innerText = subTotal.toFixed(2);


    //const taxCostPrice = parseFloat(getTaxCost.innerText) ? parseFloat(getTaxCost.innerText) : 0;
    //const shippingCostPrice = parseFloat(getShippingCost.innerText) ? parseFloat(getShippingCost.innerText) : 0;

    const totalPriceAmount = subTotal;
    //total price
    getTotalAmount.innerText = totalPriceAmount.toFixed(2);

    // console.log(totalPriceAmount);
}

// product catagory

// const getProductCard = document.querySelectorAll(".product-card");
// function productChangeColor(e) {
//   console.log(e.parentElement.parentElement.children[0]);

//   let productCard = [];
//   for (let productcardItem of getProductCard) {
//     productCard.push(productcardItem);
//   }
// }

// product catagory

const productChangeColor1 = () => {
    document.querySelector(".product-card-1").style.display = "block";
    document.querySelector(".product-card-2").style.display = "none";
    document.querySelector(".product-card-3").style.display = "none";
};

const productChangeColor2 = () => {
    document.querySelector(".product-card-2").style.display = "block";
    document.querySelector(".product-card-1").style.display = "none";
    document.querySelector(".product-card-3").style.display = "none";
};

const productChangeColor3 = () => {
    document.querySelector(".product-card-3").style.display = "block";
    document.querySelector(".product-card-1").style.display = "none";
    document.querySelector(".product-card-2").style.display = "none";
};

// price rage
let rangeMin = 0;
const range = document.querySelector(".range-selected");
const rangeInput = document.querySelectorAll(".range-input input");
const rangePrice = document.querySelectorAll(".range-price input");

rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minRange = parseInt(rangeInput[0].value);
        let maxRange = parseInt(rangeInput[1].value);
        if (maxRange - minRange < rangeMin) {
            if (e.target.className === "min") {
                rangeInput[0].value = maxRange - rangeMin;
            } else {
                rangeInput[1].value = minRange + rangeMin;
            }
        } else {
            rangePrice[0].value = minRange;
            rangePrice[1].value = maxRange;
            range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
            range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
        }
    });
});

rangePrice.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minPrice = rangePrice[0].value;
        let maxPrice = rangePrice[1].value;
        if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
            if (e.target.className === "min") {
                rangeInput[0].value = minPrice;
                range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
            } else {
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

// drop down

// let selectMenuItem = document.querySelectorAll(".menu-drop-down");
// let isSelectMenuOpen = true;

// selectMenuItem.addEventListener("click", () => {
//   // let selectDorpMenu = elemnet.querySelector(".drop-down-menu-item");

//   if (isSelectMenuOpen) {
//     selectDorpMenu.style.display = "block";
//     isSelectMenuOpen = false;
//   } else {
//     selectDorpMenu.style.display = "none";
//     isSelectMenuOpen = true;
//   }
// });
