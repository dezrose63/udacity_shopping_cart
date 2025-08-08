
/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

const products = [
  { name: "Cherry",     price: 2,   quantity: 0, productId: 101, image: "./images/cherry.jpg" },
  { name: "Orange",     price: 1.5, quantity: 0, productId: 102, image: "./images/orange.jpg" },
  { name: "Strawberry", price: 3,   quantity: 0, productId: 103, image: "./images/strawberry.jpg" }
];

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */

let cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

function getProductById(productId) {
  return products.find(function (p) { return p.productId === productId; });
}

function getCartIndexById(productId) {
  return cart.findIndex(function (p) { return p.productId === productId; });
}

function addProductToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const idx = getCartIndexById(productId);
  if (idx === -1) {
    product.quantity = 1;      // first click adds with qty 1
    cart.push(product);
  } else {
    product.quantity += 1;     // subsequent clicks just increase
  }
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

function increaseQuantity(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const idx = getCartIndexById(productId);
  if (idx === -1) {
    product.quantity = 1;
    cart.push(product);
  } else {
    product.quantity += 1;
  }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

function decreaseQuantity(productId) {
  const product = getProductById(productId);
  if (!product) return;

  if (product.quantity > 1) {
    product.quantity -= 1;
  } else if (product.quantity === 1) {
    removeProductFromCart(productId); // at 1 → remove per rubric
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

function removeProductFromCart(productId) {
  const idx = getCartIndexById(productId);
  if (idx !== -1) {
    cart[idx].quantity = 0; // reset quantity
    cart.splice(idx, 1);    // remove from cart
  }
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/

function cartTotal() {
  return cart.reduce(function (sum, item) {
    return sum + (item.price * item.quantity);
  }, 0);
}

// Global variable to hold remaining balance (via total paid)

let remainingBalance = 0;

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

function pay(amount) {
  const amt = Number(amount) || 0;

  // Initialize remaining balance for this checkout cycle on first pay call
  if (remainingBalance === 0) {
    remainingBalance = cartTotal();
  }

  remainingBalance -= amt;

  // If customer still owes money, return negative remaining balance
  if (remainingBalance > 0) {
    return -remainingBalance;
  }

  // If fully paid (or overpaid), return positive change and reset for next checkout
  const change = Math.abs(remainingBalance);
  remainingBalance = 0;
  return change;
}

/* Create a function called emptyCart that empties the products from the cart */

function emptyCart() {
  for (let i = 0; i < cart.length; i++) {
    cart[i].quantity = 0;
  }
  cart.length = 0;
  remainingBalance = 0; // reset checkout state
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

function formatCurrencyUSD(amount) {
  // Always render like "$x.xx USD" even if locale lacks USD support
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" })
      .format(Number(amount) || 0) + " USD";
  } catch (_) {
    const n = (Number(amount) || 0).toFixed(2);
    return `$${n} USD`;
  }
}

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
}
