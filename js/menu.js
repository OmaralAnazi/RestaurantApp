export const menuArray = [
    {
        id: 0,
        name: 'Pizza',
        ingredients: ['pepperoni', 'mushroom', 'mozzarella'],
        price: 12,
        image: 'images/pizza.png'
    },
    {
        id: 1,
        name: 'Hamburger',
        ingredients: ['beef', 'cheese', 'lettuce'],
        price: 8,
        image: 'images/hamburger.png'
    },
    {
        id: 2,
        name: 'Pepsi',
        ingredients: ['carbonated water', ' sugar'],
        price: 1.25,
        image: 'images/pepsi.png'
    }
];

const menuSection = document.getElementById('menu-section');

export function renderMenu() {
    menuSection.innerHTML = getMenuHtml();
}

function getMenuHtml() {
    return menuArray.map(meal => `
        <div class='container'>
            <div class='menu-holder'>
                <img src='${meal.image}' alt='${meal.name} meal' class='meal-img'>
                
                <div class='meal-details'>
                    <h2 class='meal-name'>${meal.name}</h2>
                    <p class='meal-ingredients'>${getIngredientsAsText(meal.ingredients)}</p>
                    <h3 class='meal-price'>$${meal.price}</h3>
                </div>
                
                <button id='increase-meal-${meal.id}' class='main-btns increase-btn margin-left-auto'>+</button>
            </div>
        </div>
    `).join('');
}

function getIngredientsAsText(ingredientsArray) {
    return ingredientsArray.join(', ');
}