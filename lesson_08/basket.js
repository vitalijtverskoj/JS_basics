"use strict";

const cartIconWrapEl = document.querySelector('.cartIconWrap');
const basketEl = document.querySelector('.basket');
cartIconWrapEl.addEventListener('click', event => {
  if (basketEl.classList.contains('hidden')) {
    basketEl.classList.remove('hidden');
  } else {
    basketEl.classList.add('hidden');
  }
});

/**
 * В корзине хранится количество каждого товара
 * Ключ это id продукта, значение это товар в корзине - объект, содержащий
 * id, название товара, цену, и количество штук, например:
 * {
 *    1: {id: 1, name: "product 1", price: 30, count: 2},
 *    3: {id: 3, name: "product 3", price: 25, count: 1},
 * }
 */
const basket = {};

const featuredItemsEl = document.querySelector('.featuredItems');
featuredItemsEl.addEventListener('click', event => {
  if (!event.target.classList.contains('addToCart')) {
    return;
  }
  const featuredItem = event.target.closest('.featuredItem');
  const id = +featuredItem.dataset.id;
  const name = featuredItem.dataset.name;
  const price = +featuredItem.dataset.price;
  addToCard(id, name, price);
});

function addToCard(id, name, price) {
  if (!(id in basket)) {
    basket[id] = {
      id: id,
      name: name,
      price: price,
      count: 0
    }
  }
  basket[id].count++;
  document.querySelector('.cartIconWrap span').textContent = basketCount();
  document.querySelector('.basketTotalValue').textContent = totalPrice();
  renderProductInBasket(id);
}

function basketCount() {
  let counter = 0;
  for (let key in basket) {
    counter = counter + basket[key].count;
  }
  return counter;
}

function totalPrice() {
  let totalPrice = 0;
  for (let key in basket) {
    totalPrice = totalPrice + (basket[key].price * basket[key].count);
  }
  return totalPrice;
}

function renderProductInBasket(id) {
  const basketRowEl = basketEl.querySelector(`.basketRow[data-productId="${id}"]`);
  if (!basketRowEl) {
    renderNewProductInBasket(id);
    return;
  }
  basketRowEl.querySelector('.productCount').textContent = basket[id].count;
  basketRowEl.querySelector('.productTotalRow').textContent =
    basket[id].price * basket[id].count;
}

function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="basketRow" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price *
      basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  document.querySelector('.basketTotal').insertAdjacentHTML("beforebegin", productRow);
}