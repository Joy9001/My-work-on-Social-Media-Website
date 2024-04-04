function addActive(ele) {
    ele.classList.add("active");
}

// sidebar seemore implementation
let seeMore = document.querySelector("#see-more");
let seeLess = document.querySelector("#see-less");
seeMore.addEventListener("click", () => {
    let hiddenPart = document.querySelector("#hidden-top-sidebar");
    hiddenPart.classList.remove("hidden");
    let seeLess = document.querySelector("#see-less");
    seeMore.classList.add("hidden");
    seeLess.classList.remove("hidden");
});
seeLess.addEventListener("click", () => {
    let hiddenPart = document.querySelector("#hidden-top-sidebar");
    hiddenPart.classList.add("hidden");
    let seeMore = document.querySelector("#see-more");
    seeMore.classList.remove("hidden");
    seeLess.classList.add("hidden");
});