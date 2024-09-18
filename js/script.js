const check = document.querySelector("input");
const ul = document.querySelector("ul");
console.log(ul);

check.addEventListener("click", function () {
  ul.classList.toggle("slide");
});
