const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    // let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += 100;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= 100 ;
    })
})
//entah apa
const check = document.querySelector("input");
const ul = document.querySelector("ul");
console.log(ul);

check.addEventListener("click", function () {
  ul.classList.toggle("slide");
});

const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

menuIcon.addEventListener("click", () => {
    menuList.classList.toggle("hidden");

});