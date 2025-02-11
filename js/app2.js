/*===============================
slider for navbar
================================*/
let navSlider = document?.getElementById("nav-slider");
let item = navSlider?.getElementsByClassName("slider-item");
function next() {
    // navSlider.append(item[0]);
    navSlider.prepend(item[item.length - 1]);
}
function prev() {
    // navSlider.prepend(item[item.length - 1]);
    navSlider.append(item[0]);
}
// ===========================================

/*/================================
Select js code
===============================*/


//=============================

/*================================
sign in password toggle
===============================*/
function signInPassToggle(e) {
    let passHidden = e.children[0];
    let passInput = e.parentElement.children[0]

    if (passHidden.innerText == "Show") {
        passHidden.innerText = "Hide";
        passInput.type = "text";
    } else {
        passHidden.innerText = "Show";
        passInput.type = "password";
    }
}
// ===============================================



/*===============================================
dashboard account details password toggle
=================================================*/
function handlePassToggle(e) {
    let passIcon = e.parentElement.children[1].children[0];
    let passField = e.parentElement.children[0];

    if (passIcon.classList[1] == "bi-eye-slash-fill") {
        passIcon.classList.remove("bi-eye-slash-fill");
        passIcon.classList.add("bi-eye-fill");
        passField.type = "text";
    } else {
        passIcon.classList.remove("bi-eye-fill");
        passIcon.classList.add("bi-eye-slash-fill");
        passField.type = "password";
    }
}
// =====================================================



/*========================================
dashboard return product's image upload
=========================================*/
const display = document.querySelector(".upload-product-img");
const input = document.querySelector("#imgUpload");
let img = document.querySelector("img");

if (input) {
    input.addEventListener("change", () => {
        let reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.addEventListener("load", () => {
            display.innerHTML = `<img src=${reader.result} alt=''/>`;
        });
    });
}
// =============================================================


/*==========================
dashboard refund product toggle
==========================*/
let manualRefundBlock = document.getElementById("refundByBank");
let cardRefundBlock = document.getElementById("refundByCard");

function handleRefundByManually() {
    manualRefundBlock.classList.remove("d-none");
    manualRefundBlock.classList.add("d-block");
    cardRefundBlock.classList.remove("d-block")
    cardRefundBlock.classList.add("d-none")
}

function handleRefundByCard() {
    cardRefundBlock.classList.remove("d-none");
    cardRefundBlock.classList.add("d-block");
    manualRefundBlock.classList.remove("d-block");
    manualRefundBlock.classList.add("d-none");

}
// ===============================================================



/*=======================
dashboard set-refund date
======================*/
const currentDate = new Date().toJSON().split("-").slice(0, 2).join("-") ?? "";
let refundDate = document.getElementById("expiry-date");
if (refundDate) {
    refundDate.value = currentDate;
    refundDate.min = currentDate;
}
// =======================================================



/*============================
dashboard address section
============================*/
// enable edit address
function handleEditAddress(e) {
    let addressInputs = e.parentElement.parentElement.children[1].children[0].children;
    let addressBtn = e.parentElement.parentElement.children[1].children[1];
    for (let addressInput of addressInputs) {
        if (addressInput.disabled) {
            addressInput.removeAttribute("disabled");
            addressInput.classList.remove("border-0", "text-black", "fw-medium", "fs-6");
            addressInput.classList.add("mb-2", "form-control", "rounded-0", "text-secondary", "small-text");
            addressInput.style.borderColor = "#e2e2e2";
            addressBtn.classList.remove("d-none");
            addressBtn.classList.add("d-block");
        }
    }
    addressInputs[addressInputs.length - 1].classList.add("form-select")
}
// update & disable edit address
function updateAddress(e) {
    let addressInputs = e.parentElement.parentElement.children[0].children;
    let addressBtn = e.parentElement;

    for (let addressInput of addressInputs) {
        addressInput.setAttribute("disabled", "true");
        addressInput.classList.add("border-0");
        addressInput.classList.remove("mb-2", "form-control", "rounded-0");
        addressInput.style.borderColor = "transparent";
        addressBtn.classList.add("d-none");
        addressBtn.classList.remove("d-block");
    }
    addressInputs[0].classList.add("text-black", "fs-6", "fw-medium")
    addressInputs[addressInputs.length - 1].classList.remove("form-select")
}
// =========================================================

function handleSubNav(elem) {
    const subMenuItem = elem.parentElement.children[2];

    if (subMenuItem.className.includes("d-none")) {
        const allSubMenus = document.querySelectorAll(".sub-nav-container");
        allSubMenus.forEach(menu => {
            menu.classList.remove("d-flex");
            menu.classList.add("d-none");
        });
        subMenuItem.classList.remove("d-none");
        subMenuItem.classList.add("d-flex");
    } else {
        subMenuItem.classList.remove("d-flex");
        subMenuItem.classList.add("d-none");
    }
}



// navSlider.addEventListener("wheel", (evt) => {
//     evt.preventDefault();
//     // scrollContainer.scrollLeft += evt.deltaY;
//     if(evt.deltaY > 0){
//         navSlider.append(item[0]);
//     }
//     else{
//         navSlider.prepend(item[item.length - 1]);
//     }
// });
