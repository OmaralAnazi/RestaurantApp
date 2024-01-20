import { renderOrder, displaySuccessfulOrderMessage } from './order.js';

const creditCardWindow = document.getElementById('credit-card-window');
const creditCardForm = document.getElementById('credit-card-form');
const happyMealWindow = document.getElementById('happy-meal-window');

creditCardForm.addEventListener('submit', handleCreditCardSubmission);

export function hideCreditCardWindow() {
    creditCardWindow.classList.add('hidden');
    toggleMainBtnUsability(true);
}

export function showCreditCardWindow() {
    creditCardWindow.classList.remove('hidden');
    toggleMainBtnUsability(false);
}

export function showHappyMealMessage() {
    renderOrder();
    happyMealWindow.classList.remove('hidden');
}

export function hideHappyMealMessage() {
    toggleMainBtnUsability(true);
    happyMealWindow.classList.add('hidden');
}

function handleCreditCardSubmission(e) {
    e.preventDefault();

    const username = new FormData(creditCardForm).get('username');
    creditCardForm.reset();
    validateCreditCard(username);
}

function validateCreditCard(username) {
    const originalHtml = creditCardWindow.innerHTML;
    creditCardWindow.innerHTML = getProcessingAnimationHTML();
    setTimeout(() => {
        hideCreditCardWindow();
        displaySuccessfulOrderMessage(username);
        creditCardWindow.innerHTML = originalHtml;
    }, 3000);
}

function getProcessingAnimationHTML() {
    return `
    <div id='form-processing-state' class=''>
        <img class='process-animation-img' src='images/process-animation.gif' alt='process animation'>
        <h3>Processing payment...</h3>
    </div>`;
}

function toggleMainBtnUsability(isUsability) {
    const isDisabled = !isUsability;
    document.querySelectorAll('.main-btns').forEach(button => {
        button.disabled = isDisabled;
        button.style.pointerEvents = isDisabled ? 'none' : 'all';
    });
}