/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
const products = [];

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/
// Create 3 product objects and push them into the products array
products.push({
  name: "Cherry",
  price: 2.99,
  quantity: 0,
  productId: 1,
  image: "/images/cherry.jpg"
});

products.push({
  name: "Orange",
  price: 1.49,
  quantity: 0,
  productId: 2,
  image: "/images/orange.jpg"
});

products.push({
  name: "Strawberry",
  price: 3.99,
  quantity: 0,
  productId: 3,
  image: "/images/strawberry.jpg"
});


/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */

const cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

function addProductToCart(productId) {
  // Find the product in the products array
  const product = products.find(item => item.productId === productId);

  if (product) {
    // Increase the quantity
    product.quantity++;

    // Check if the product is already in the cart
    const inCart = cart.find(item => item.productId === productId);

    // If not already in the cart, add it
    if (!inCart) {
      cart.push(product);
    }
  } else {
    console.log("Product not found.");
  }
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
function increaseQuantity(productId) {
  // Find the product in either products or cart (cart is typically where quantity is adjusted)
  const product = products.find(item => item.productId === productId);

  if (product) {
    product.quantity++;
  } else {
    console.log("Product not found.");
  }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

function decreaseQuantity(productId) {
  // Find the product in the cart
  const productIndex = cart.findIndex(item => item.productId === productId);

  if (productIndex !== -1) {
    // Decrease the quantity
    cart[productIndex].quantity--;

    // If quantity reaches 0, remove it from the cart
    if (cart[productIndex].quantity === 0) {
      cart.splice(productIndex, 1);
    }
  } else {
    console.log("Product not found in cart.");
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

function removeProductFromCart(productId) {
  // Find the product in the cart
  const productIndex = cart.findIndex(item => item.productId === productId);

  if (productIndex !== -1) {
    // Set the product's quantity to 0
    cart[productIndex].quantity = 0;

    // Remove the product from the cart
    cart.splice(productIndex, 1);
  } else {
    console.log("Product not found in cart.");
  }
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/

function cartTotal() {
  let total = 0;

  // Iterate through the cart to calculate total cost
  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  return total;
}

/* Create a function called emptyCart that empties the products from the cart */

function emptyCart() {
  // Remove all items from the cart
  cart.length = 0;
}

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

function pay(amount) {
  const totalCost = cartTotal();  // Get total cost of items in the cart
  return amount - totalCost;      // Positive = change to return, Negative = remaining balance
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

// Helper function to format numbers as USD currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
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
