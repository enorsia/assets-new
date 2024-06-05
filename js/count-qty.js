/*============================= 
product count increase/decrease 
=============================*/
let sum = 1;
function handleCountDecrease(e) {
  sum = sum - 1;
  if (sum < 0) {
    sum = 0;
  }
  e.parentElement.children[1].innerText = sum;
}
function handleCountIncrease(e) {
  sum = sum + 1;
  e.parentElement.children[1].innerText = sum;
}
// ===================================================