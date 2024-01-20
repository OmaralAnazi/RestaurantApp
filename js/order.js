import { menuArray } from './menu.js';

const orderingSection = document.getElementById('ordering-section');
let userMealsBasket = [];

export function renderOrder() {
    orderingSection.innerHTML = getOrderHtml();
}

function getOrderHtml() {
    if (isBasketEmpty()) return '';

    const [orderDetailsHtml, totalPrice] = getOrderDetailsAndTotalPrice();
    return `
    <div class="container">
        <div class="order-elements">
            <h3 class="order-title">Your order</h3>
            ${orderDetailsHtml}
            <div class="meal-order-info">
                <p>Total price:</p>
                <p class="margin-left-auto">$${totalPrice}</p>
            </div>
            <button id="complete-order-btn" class="main-btns complete-order">Complete order</button>
        </div>
    </div>`;
}

function isBasketEmpty() {
    return userMealsBasket.length === 0;
}

function getOrderDetailsAndTotalPrice() {
    let orderDetailsHtml = ''; 
    let totalPrice = 0;
    userMealsBasket.forEach(meal => {
        orderDetailsHtml += `
        <div class="meal-order-info">
            <p>${meal.count}x ${meal.name}</p>
            <button id="decrease-meal-${meal.id}" class="main-btns remove-meal">remove</button>
            <p class="margin-left-auto">$${meal.price * meal.count}</p>
        </div>`;
        totalPrice += meal.price * meal.count;
    });
    return [orderDetailsHtml, totalPrice];
}

export function addMealToOrder(mealId) {
    updateMealCountInBasket(mealId);
}

export function removeMealFromOrder(mealId) {
    updateMealCountInBasket(mealId, false);
}

function updateMealCountInBasket(mealId, isIncrement = true) {
    const mealInBasket = findMealById(mealId, userMealsBasket);

    if (mealInBasket) {
        isIncrement ? mealInBasket.count++ : mealInBasket.count--;
        if (mealInBasket.count === 0) {
            const index = userMealsBasket.indexOf(mealInBasket);
            userMealsBasket.splice(index, 1);
        }
    } else if (isIncrement) {
        const mealInMenu = findMealById(mealId, menuArray);
        if (mealInMenu) {
            userMealsBasket.push({ ...mealInMenu, count: 1 });
        }
    }
    renderOrder();
}

function findMealById(mealId, array) {
    return array.find(meal => meal.id === mealId);
}

export function displaySuccessfulOrderMessage(username) {
    orderingSection.innerHTML = `
    <div class="container successful-payment-state">
        <p class="successful-message">Thanks, <span class="bold">${username}!</span> Your order is on its way!</p>
        <button id="confirm-receiving-btn">Confirm Receiving</button> 
    </div>`;
    userMealsBasket = [];
}
