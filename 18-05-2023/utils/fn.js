import { cartItems, cartEl } from "../script.js";

export const cE = (el) => document.createElement(el);

export const qS = (el) => document.querySelector(el);

export const qSA = (els) => document.querySelectorAll(els);

export const formatDescriptionText = (str) =>
  str.split(" ").splice(0, 5).join(" ") + " ...";

//prodotti singoli card
export const createProduct = (data) => {
  const wrapperEl = cE("div");
  const textWrapperEl = cE("div");
  const imageEl = cE("img");
  const titleEl = cE("h3");
  const descriptionEl = cE("p");
  const ratingEl = cE("p");
  const priceEl = cE("h4");
  /* const buttonEl = cE("button"); */
  /* const favEl = cE("button"); */

  wrapperEl.className = "productCard";
  wrapperEl.setAttribute("id", data.id);
  textWrapperEl.className = "productCard__text";
  imageEl.src = data.thumbnail;
  imageEl.alt = data.title;
  titleEl.textContent = data.title;
  descriptionEl.textContent = formatDescriptionText(data.description);
  ratingEl.textContent = data.rating;
  priceEl.textContent = data.price + " $";
  /* favEl.textContent = "❤️"; */

  textWrapperEl.append(titleEl, descriptionEl, ratingEl, priceEl /* favEl */);

  wrapperEl.append(imageEl, textWrapperEl);

  return wrapperEl;
};

// Sezione singolo prodotto (modale)
export const createProductModal = (productData, parent = null) => {
  const wrapperEl = cE("div");
  const overlayEl = cE("div");
  const galleryEl = cE("div");
  const mainImgEl = cE("img");
  const textEl = cE("div");
  const mainTextEl = cE("div");
  const mainTextTitleEl = cE("h1");
  const mainTextDescEl = cE("p");
  const mainTextRateEl = cE("p");
  const buyTextEl = cE("div");
  const buyTextFirstBtnEl = cE("button");
  const buyTextSecondBtnEl = cE("button");

  wrapperEl.className = "modalProduct";
  overlayEl.className = "modalOverlay";
  galleryEl.className = "modalProduct__gallery";
  mainImgEl.src = productData.thumbnail;
  mainImgEl.alt = productData.title;

  textEl.className = "modalProduct__text";
  mainTextEl.className = "modalMainText";
  mainTextTitleEl.textContent = productData.title;
  mainTextDescEl.textContent = productData.description;
  mainTextRateEl.textContent = productData.rating;

  buyTextEl.className = "modalMainBuy";
  buyTextFirstBtnEl.textContent = "Buy Now";
  buyTextSecondBtnEl.textContent = "Back";

  mainTextEl.append(mainTextTitleEl, mainTextDescEl, mainTextRateEl);
  buyTextEl.append(buyTextFirstBtnEl, buyTextSecondBtnEl);
  galleryEl.append(mainImgEl);
  textEl.append(mainTextEl, buyTextEl);
  wrapperEl.append(overlayEl, galleryEl, textEl);

  if (parent) {
    overlayEl.addEventListener("click", () => parent.removeChild(wrapperEl));
    buyTextSecondBtnEl.addEventListener("click", () =>
      parent.removeChild(wrapperEl)
    );
  }

  buyTextFirstBtnEl.addEventListener("click", () => {
    alert("Prodotto aggiunto al carrello!");
    cartItems.push(productData);
    parent.removeChild(wrapperEl);

    if (cartItems.length >= 1) {
      cartEl.classList.add("itemsInCart");
    }
  });

  return wrapperEl;
};

export const createCartModal = (cartItems, parent = null) => {
  const wrapperEl = cE("div");
  const totalItemsEl = cE("h2");
  const priceEl = cE("p");
  const closeBtnEl = cE("button");

  wrapperEl.className = "cartModal";
  totalItemsEl.textContent = `Number of products: ${cartItems.length}`;
  closeBtnEl.className = "cartModal__closeBtn";
  closeBtnEl.textContent = "X";
  priceEl.textContent = `Total: ${cartItems.reduce(
    (acc, item) => acc + item.price,
    0
  )}`;

  cartItems.forEach((item) => {
    const titleEl = cE("h4");
    const descriptionEl = cE("p");
    const priceElCart = cE("p");

    titleEl.textContent = item.title;
    descriptionEl.textContent = item.description;
    priceElCart.textContent = `Price item: ${+item.price}`;

    wrapperEl.append(titleEl, descriptionEl, priceElCart);
    wrapperEl.append(closeBtnEl, totalItemsEl, priceEl);
  });

  closeBtnEl.addEventListener("click", () => {
    parent.removeChild(wrapperEl);
    cartEl.disabled = false;
  });

  return wrapperEl;
};
