/*==========================================
dashboard ordered product calculation
==========================================*/
const productQty = document.querySelectorAll(".ordered-product-qty");
const productUnitPrice = document.querySelectorAll(".ordered-product-unit-price");
const productSubtotalPrice = document.querySelectorAll(".ordered-product-subtotal-price");
let productTotalPrices = document.querySelector(".ordered-product-total-price");
//let productVatTax = document.querySelector(".product-vat-tax");
let productShipping = document.querySelector(".product-shipping-cost");
let productGrandtotal = document.querySelector(".ordered-product-grandtotal-price");

// find subtotal price
let qtyArr = [];
for (let pq of productQty) {
    qtyArr.push(parseInt(pq.innerText));
}
let unitPriceArr = [];
for (let pup of productUnitPrice) {
    unitPriceArr.push(parseFloat(pup.innerText));
}
const subtotalPrice = qtyArr.map((elm, i) => unitPriceArr[i] * elm);
subtotalPrice.forEach((elm, i) => {
    if (productSubtotalPrice[i]) {
        productSubtotalPrice[i].innerText = elm.toFixed(2);
    }
});

let totalPrices = subtotalPrice.reduce((r, c, i) => r + c, 0);
if (productTotalPrices) {
    productTotalPrices.innerText = totalPrices.toFixed(2);
}

// find grandtotal price
if (productGrandtotal)
    productGrandtotal.innerText = (totalPrices + parseFloat(productShipping.innerText)).toFixed(2);

// ==============================================
