import { renderMenu } from './menu.js';
import { renderOrder, addMealToOrder, removeMealFromOrder } from './order.js';
import { showCreditCardWindow, hideCreditCardWindow, showHappyMealMessage, hideHappyMealMessage } from './ui.js';

document.addEventListener('click', handleGlobalClicks);

const actionLookup = {
    'complete-order-btn': showCreditCardWindow,
    'close-payment-btn': hideCreditCardWindow,
    'confirm-receiving-btn': showHappyMealMessage,
    'close-happy-meal-btn': hideHappyMealMessage
};

function handleGlobalClicks(event) {
    const { id } = event.target;

    if (id.startsWith('increase-meal-') || id.startsWith('decrease-meal-')) {
        const mealId = parseInt(id.split('-').pop(), 10); 
        id.startsWith('increase') ? addMealToOrder(mealId) : removeMealFromOrder(mealId);
    } else if (actionLookup[id]) { // Use lookup for direct action matching
        actionLookup[id]();
    }
}

renderMenu();
renderOrder();