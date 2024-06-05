/*=====================
cart's selected product
=====================*/
const productsPrice = document.querySelectorAll(".selected-product-price");
const itemCountInCart = document.querySelectorAll(".itemCountInCart");
let productTotalPrice = document.getElementById("cart-product-total-price");

// for (let item of itemCountInCart) {
//     item.innerHTML = productsPrice.length;
// }

let totalPrice = 0;
for (let price of productsPrice) {
    let p = parseFloat(price.innerHTML);
    let quantity = price.parentElement.parentElement.parentElement.children[1].children[3].children[0].textContent;
    totalPrice += p * quantity;
}
if (productTotalPrice) {
    productTotalPrice.innerHTML = totalPrice.toFixed(2);
}
// productTotalPrice.innerHTML = totalPrice.toFixed(2);
// ================================================
