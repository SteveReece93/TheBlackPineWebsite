// Helper function to close the popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Helper function to get the current day of the week
function getDayOfWeek() {
    const date = new Date();
    return date.getDay(); // 0 = Sunday, 1 = Monday, etc.
}

// 2-for-1 Pizza Logic (Available on Mondays)
function openTwoForOnePizzaPopup() {
    const day = getDayOfWeek();
    if (day === 1) { // 1 = Monday
        document.getElementById('twoForOnePizzaPopup').style.display = 'block';
    } else {
        alert('The 2-for-1 Pizza special is only available on Mondays!');
    }
}

// Wing Wednesday Logic (Available on Wednesdays only if a medium pizza is selected)
function openWingsSpecialPopup() {
    const day = getDayOfWeek();
    if (day === 3 && mediumPizzaPurchased()) { // 3 = Wednesday
        document.getElementById('wingsSpecialPopup').style.display = 'block';
    } else {
        alert('The Wing Wednesday special is only available on Wednesdays with a medium pizza purchase!');
    }
}

// Brisket Bonanza Logic (Available on Thursdays)
function openBrisketBonanzaPopup() {
    const day = getDayOfWeek();
    if (day === 4) { // 4 = Thursday
        document.getElementById('brisketBonanzaPopup').style.display = 'block';
    } else {
        alert('The Brisket Bonanza special is only available on Thursdays!');
    }
}

// Simulate medium pizza purchase check (this would be more complex with a real cart system)
function mediumPizzaPurchased() {
    return true; // Simulate that a medium pizza has been purchased
}

// Calculate the price for 2-for-1 Pizza special based on the more expensive pizza
function calculatePizzaPrice() {
    const pizza1Price = getPizzaPrice(document.getElementById('pizza1Dropdown').value);
    const pizza2Price = getPizzaPrice(document.getElementById('pizza2Dropdown').value);
    const highestPrice = Math.max(pizza1Price, pizza2Price);
    alert(`You pay CAD$${highestPrice.toFixed(2)} for the 2-for-1 Pizza deal.`);
}

// Get pizza price based on the selection
function getPizzaPrice(pizzaName) {
    const pizzaPrices = {
        "Margherita": 20.00,
        "Pepperoni": 22.00,
        "BBQ Chicken": 24.00,
        // Add other pizza prices here...
    };
    return pizzaPrices[pizzaName] || 20.00; // Default to 20.00 if not found
}

// Example function to simulate adding an item to the cart
function addToCart(itemName, quantity, price) {
    alert(`Added ${quantity} x ${itemName} to the cart for CAD$${price}.`);
}

// Redirect to the home page when the Black Pine logo is clicked
document.getElementById('blackPineLogo').addEventListener('click', function () {
    window.location.href = 'index.html';
});

// Get elements for the pizza popup
const popup = document.getElementById('itemPopup');
const itemNameElement = document.getElementById('popupItemName');
const descriptionElement = document.getElementById('popupItemDescription');
const priceRangeElement = document.getElementById('popupItemPriceRange');
const quantityInput = document.getElementById('itemQuantity');
const pizzaSizeCrust = document.getElementById('pizzaSizeCrust');
const totalPriceElement = document.getElementById('totalPrice');
const addToCartButton = document.getElementById('addToCartButton');
const goToCartButton = document.getElementById('goToCartButton');
const closePopupButton = document.querySelector('.popup .close');

// Default price and other variables for pizza popup
let basePrice = 22.95;
let extraCost = 0;
let quantity = 1;

// Update total price for pizza
function updateTotalPrice() {
    const selectedExtras = document.querySelectorAll('input[type="checkbox"]:checked');
    extraCost = 0;
    selectedExtras.forEach(extra => {
        extraCost += parseFloat(extra.dataset.price);
    });

    const total = (basePrice + extraCost) * quantity;
    totalPriceElement.textContent = `CAD$${total.toFixed(2)}`;
}

// Open the pizza popup
function openPopup(itemName, description, priceRange) {
    itemNameElement.textContent = itemName;
    descriptionElement.textContent = description;
    priceRangeElement.textContent = priceRange;
    popup.style.display = 'flex';
}

// Select all pizza items and add event listeners
document.querySelectorAll('#pizza .menu-item').forEach(item => {
    item.addEventListener('click', function () {
        const itemName = this.getAttribute('data-item-name');
        const description = this.querySelector('p').textContent;
        const priceRange = this.querySelector('.price').textContent;
        openPopup(itemName, description, priceRange);
    });
});

// Event listener for the pizza quantity buttons
document.getElementById('increaseQuantity').addEventListener('click', function () {
    quantity++;
    quantityInput.value = quantity;
    updateTotalPrice();
});

document.getElementById('decreaseQuantity').addEventListener('click', function () {
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateTotalPrice();
    }
});

// Event listener for the pizza size selection
pizzaSizeCrust.addEventListener('change', function () {
    const selectedValue = this.value;
    switch (selectedValue) {
        case '14-inch-regular':
            basePrice = 22.95;
            break;
        case '14-inch-thin':
            basePrice = 23.95;
            break;
        case '12-inch-regular':
            basePrice = 20.95;
            break;
        case '12-inch-thin':
            basePrice = 21.95;
            break;
        case 'gluten-free':
            basePrice = 25.95;
            break;
        default:
            basePrice = 22.95;
    }
    updateTotalPrice();
});

// Event listener for the extra toppings
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateTotalPrice);
});

// Add to cart functionality for the pizza popup
addToCartButton.addEventListener('click', function () {
    const itemName = itemNameElement.textContent;
    const selectedSize = pizzaSizeCrust.value;
    const finalPrice = totalPriceElement.textContent;

    alert(`Added ${quantity} x ${itemName} (${selectedSize}) to the cart for ${finalPrice}.`);
    popup.style.display = 'none';
});

// Go to cart functionality for the pizza popup
goToCartButton.addEventListener('click', function () {
    window.location.href = 'cart.html';
});

// Close the pizza popup
closePopupButton.addEventListener('click', function () {
    popup.style.display = 'none';
});

// Get elements for the simple popup
const quantityPopup = document.getElementById('quantityPopup');
const itemNameSimpleElement = document.getElementById('popupItemNameSimple');
const quantityInputSimple = document.getElementById('itemQuantitySimple');
const addToCartButtonSimple = document.getElementById('addToCartButtonSimple');
const goToCartButtonSimple = document.getElementById('goToCartButtonSimple');
const closePopupButtonSimple = document.querySelector('#quantityPopup .close');
const drinkFlavorsDropdown = document.getElementById('drinkFlavors'); // Dropdown element for drink flavors

// Variables for the simple popup
let simpleQuantity = 1;
let selectedFlavor = ''; // Variable to store the selected drink flavor

// Function to open the simple popup for any category
function openSimplePopup(itemName, description, isDrink = false) {
    itemNameSimpleElement.textContent = itemName;
    quantityInputSimple.value = simpleQuantity;
    quantityPopup.style.display = 'flex';

    // Show or hide the drink flavors dropdown based on whether it's a drink
    drinkFlavorsDropdown.style.display = isDrink ? 'block' : 'none';
}

// Event listener for the simple popup quantity buttons
document.getElementById('increaseQuantitySimple').addEventListener('click', function () {
    simpleQuantity++;
    quantityInputSimple.value = simpleQuantity;
});

document.getElementById('decreaseQuantitySimple').addEventListener('click', function () {
    if (simpleQuantity > 1) {
        simpleQuantity--;
        quantityInputSimple.value = simpleQuantity;
    }
});

// Event listener for the drink flavors dropdown
drinkFlavorsDropdown.addEventListener('change', function () {
    selectedFlavor = this.value; // Store the selected flavor
});

// Event listener for each item in the specified categories (wings, appetizers, pasta, kids, desserts, entrees, salads, pastas & mains, burgers & sandos)
document.querySelectorAll('#wings .menu-item, #appetizers .menu-item, #pasta .menu-item, #kids .menu-item, #desserts .menu-item, #entrees .menu-item, #salads .menu-item, #burgers-sandos .menu-item').forEach(item => {
    item.addEventListener('click', function () {
        const itemName = this.querySelector('h3').textContent; // Correctly select item name
        const description = this.querySelector('p').textContent; // Get description
        const price = this.querySelector('.price').textContent; // Get price
        openSimplePopup(itemName, description, false); // Open simple popup with item details
    });
});

// Event listener for each drink item
document.querySelectorAll('#drinks .menu-item').forEach(item => {
    item.addEventListener('click', function () {
        const itemName = this.querySelector('h3').textContent; // Correctly select item name
        openSimplePopup(itemName, '', true); // Drinks have the dropdown for flavors
    });
});

// Close the simple popup
closePopupButtonSimple.addEventListener('click', function () {
    quantityPopup.style.display = 'none';
});

// Add to cart functionality for the simple popup
addToCartButtonSimple.addEventListener('click', function () {
    const itemName = itemNameSimpleElement.textContent;
    alert(`Added ${simpleQuantity} x ${itemName} to the cart.`);
    quantityPopup.style.display = 'none';
});

// Go to cart functionality for the simple popup
goToCartButtonSimple.addEventListener('click', function () {
    window.location.href = 'cart.html';
});


