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