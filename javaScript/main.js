// counter items
let allProductsJson;
let normalResponsive = `
        <div class="logo">
          <a href="#" id="logo">Tote</a>
          <a href="#">Funky Printed Bags </a>
        </div>
        <nav>
          <ul>
            <li><a href="#shop" class="active">shop</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#">Gift Card</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div class="header-left">
          <div class="search" id="parentSearch">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="search..." />
          </div>
          <div class="log-in">
            <a href="#">
              <i class="fa-solid fa-circle-user"></i>
              log in
            </a>
          </div>
          <div class="cart" id="openCart">
            <i class="fa-solid fa-bag-shopping"></i>
            <span class="counter">0</span>
          </div>`;

let responsiveMobile = `
<div class="mobile">
<div class="logo">
  <a href="#" id="logo">Tote</a>
  <a href="#">Funky Printed Bags </a>
</div>
<div class="header-left">
  <div class="cart" id="openCart">
    <i class="fa-solid fa-bag-shopping"></i>
    <span class="counter">0</span>
  </div>
  <div id="openMenu">
    <i class="fa-solid fa-bars"></i>
  </div>
</div>
</div>
<div class="search search-mobile" id="parentSearch">
<input
  type="search"
  name="search"
  id="search"
  placeholder="search..." />
<i class="fa-solid fa-magnifying-glass"></i>
</div>
<nav class="menu-mobile" id="menu">
<div class="log-in">
  <a href="#">
    <i class="fa-solid fa-circle-user"></i>
    log in
  </a>
  <div id="closeMenu">
    <span></span>
    <span></span>
  </div>
</div>
<ul>
  <li><a href="#shop" class="active">shop</a></li>
  <li><a href="#about">About</a></li>
  <li><a href="#">Gift Card</a></li>
  <li><a href="#contact">Contact</a></li>
</ul>
</nav>`;
openCart();
// media mobile 767px
let headerContainer = document.getElementById("headerResp");
window.onload = () => {
  responsiveHeader();
  openCart();
  getItemsCart();
  // input search
  let parentSearch = document.getElementById("parentSearch");
  let searchInput = document.getElementById("search");
  parentSearch.addEventListener("click", () => {
    searchInput.focus();
  });
};
window.onresize = () => {
  responsiveHeader();
  openCart();
};

function responsiveHeader() {
  if (window.screen.width < 768) {
    headerContainer.innerHTML = responsiveMobile;
    openAndCloseMenu();
  } else {
    headerContainer.innerHTML = normalResponsive;
  }
}

// open Menu and close Menu

function openAndCloseMenu() {
  let menu = document.getElementById("menu");
  let closeMenu = document.getElementById("closeMenu");
  let openMenu = document.getElementById("openMenu");
  let menuLinks = document.querySelectorAll("nav ul li");
  closeMenuIfClicked(menuLinks);
  openMenuFun();
  closeMenuFun();
}
// open Menu
function openMenuFun() {
  openMenu.addEventListener("click", () => {
    closeMenu.classList.add("active");
    menu.style.cssText = `transform: translateX(0);opacity: 1;`;
  });
}
// close Menu
function closeMenuFun() {
  closeMenu.addEventListener("click", () => {
    closeMenu.classList.remove("active");
    menu.style.cssText = `transform: translateX(110%);opacity: 0;`;
  });
}

// Close menu if links are clicked

function closeMenuIfClicked(Links) {
  Links.forEach((li) => {
    li.onclick = () => {
      closeMenu.classList.remove("active");
      menu.style.cssText = `transform: translateX(110%);opacity: 0;`;
    };
  });
}

// Button go to up

let goUp = document.createElement("button");
goUp.innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
goUp.id = "goUp";

// scroll top
function scrollTop() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}
goUp.addEventListener("click", scrollTop);
window.onscroll = () => {
  document.body.append(goUp);
};
window.onscrollend = () => {
  setTimeout(() => {
    goUp.remove();
  }, 3000);
};

// Get Data
let productContainer = document.querySelector("#shop .container");
fetch("https://api.jsonbin.io/v3/b/67b0b12ead19ca34f804c406")
  .then((response) => response.json())
  .then((data) => {
    allProductsJson = data;
    data.forEach((product) => {
      productContainer.innerHTML += `
              <div class="product">
          <div class="image">
            <img id="image_hover" src="./${product.img}" alt="${
        product.name
      }" data-id="${product.id}">
            ${
              product.sale
                ? "<span>sale</span>"
                : product.top_sellers
                ? "<span>top sellers</span>"
                : ""
            }
          </div>
          <div class="info">
            <h4>${product.name}</h4>
            <hr>
            <p><span class="old-price">${
              product.discount ? product.old_price.toFixed(2) + "EGP" : ""
            }</span>${product.price.toFixed(2)}EGP</p>
            <button id="addToCart" onclick="addItemsInCart(${
              product.id
            }, this)">Add To Cart</button>
          </div>
        </div>`;
    });
    // Change src of image on hover
    changeSrcImage(data);
  })
  .catch((error) => console.error("Error:", error));
// verify local storage is not empty
let itemsCart;
if (localStorage.itemCart != null) {
  itemsCart = JSON.parse(localStorage.itemCart);
} else {
  itemsCart = [];
}
// Add items in Cart
let bodyCart = document.getElementById("bodyCart");
function addItemsInCart(id, btn) {
  itemsCart.push(allProductsJson[id]);
  btn.classList.add("active");
  getItemsCart();
  localStorage.setItem("itemCart", JSON.stringify(itemsCart));
}
// Get Items in Cart
function getItemsCart() {
  let total = 0;
  let subTotal = document.getElementById("subtotal");
  let count_item = document.querySelector(".counter");
  let itemsNum = document.getElementById("itemsNum");
  itemsNum.innerHTML = count_item.innerHTML = itemsCart.length;
  let contentBodyCart = "";
  if (itemsCart.length > 0) {
    for (let i = 0; i < itemsCart.length; i++) {
      contentBodyCart += `
        <div class="product">
          <div class="box">
            <div class="image">
              <img src="${itemsCart[i].img}" alt="">
            </div>
            <div class="info">
              <h4>${itemsCart[i].name}</h4>
              <p><span class="old-price">${
                itemsCart[i].discount
                  ? itemsCart[i].old_price.toFixed(2) + "EGP"
                  : ""
              }</span>${itemsCart[i].price.toFixed(2)}.EGP</p>
              <p>color: ${itemsCart[i].color}</p>
              <div class="price">
                <div class="input"><i class="fa-solid fa-minus" onclick="removeOneAtCounter(${i}, this)"></i><span id="counter">${
        itemsCart[i].counter
      }</span><i class="fa-solid fa-plus" onclick="addOneAtCounter(${i}, this)"></i></div>
                <p>${(itemsCart[i].price * itemsCart[i].counter).toFixed(
                  2
                )}EGP</p>
              </div>
            </div>
          </div>
          <i class="fa-solid fa-trash-can" onclick="removeItemFromCart(${i})"></i>
        </div>`;
      total += itemsCart[i].price * itemsCart[i].counter;
    }
  } else {
    contentBodyCart = "<p>Your cart is empty.</p>";
  }
  bodyCart.innerHTML = contentBodyCart;
  subTotal.innerHTML = total.toFixed(2) + "EGP";
}
// counter Item In Cart Edit

function addOneAtCounter(index) {
  if (itemsCart[index].counter < 10) {
    itemsCart[index].counter++;
    localStorage.setItem("itemCart", JSON.stringify(itemsCart));
  }
  getItemsCart();
}
function removeOneAtCounter(index) {
  if (itemsCart[index].counter > 1) {
    itemsCart[index].counter--;
    localStorage.setItem("itemCart", JSON.stringify(itemsCart));
  }
  getItemsCart();
}
// Remove Item From Cart
function removeItemFromCart(index) {
  itemsCart.splice(index, 1);
  localStorage.setItem("itemCart", JSON.stringify(itemsCart));
  getItemsCart();
  let btnsAddCart = document.querySelectorAll("#addToCart");
  for (let i = 0; i < btnsAddCart.length; i++) {
    btnsAddCart[i].classList.remove("active");
    itemsCart.forEach((product) => {
      if (product.id == i) {
        btnsAddCart[i].classList.add("active");
      }
    });
  }
}
// Change src of image on hover

function changeSrcImage(products) {
  let imgHover = document.querySelectorAll("#image_hover");
  imgHover.forEach((img) => {
    img.addEventListener("mouseover", (ele) => {
      ele.currentTarget.src = products[ele.currentTarget.dataset.id].img_hover;
    });
    img.addEventListener("mouseout", (ele) => {
      ele.currentTarget.src = products[ele.currentTarget.dataset.id].img;
    });
  });
}

let backBlur = document.createElement("div");
backBlur.classList.add("background-blur");
let cart = document.getElementById("cart");
let btnCloseCart = document.getElementById("closeCart");
// close cart
function closeCart() {
  backBlur.remove();
  cart.style.cssText = `transform: translateX(100%)`;
}
btnCloseCart.addEventListener("click", closeCart);

// open cart
function openCart() {
  let btnOpenCart = document.getElementById("openCart");
  btnOpenCart.addEventListener("click", () => {
    cart.style.cssText = `transform: translateX(0)`;
    document.body.append(backBlur);
    backBlur.onclick = closeCart;
  });
}
