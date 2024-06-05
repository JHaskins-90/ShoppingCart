// Array of product objects, each containing details of a product
const products = [
  { name: 'cherries', price: 2, quantity: 0, productId: 1, image: 'images/cherry.jpg' },
  { name: 'oranges', price: 1.50, quantity: 0, productId: 2, image: 'images/orange.jpg' },
  { name:'strawberries', price: 4.50, quantity: 0, productId: 3, image: 'images/strawberry.jpg' }
];

// Array to hold products added to the cart
let cart = [];

// Function to add a product to the cart given its productId
function addProductToCart(productId) {
  // Find the product with the specified productId
  let product = products.find(product => product.productId === productId);

  // Increment the quantity of the found product
  if(product){
    product.quantity += 1;
  }

  // If the product is not already in the cart, add it to the cart
  if (!cart.includes(product)) {
    cart.push(product);
  }
}

// Function to increase the quantity of a product in the cart
function increaseQuantity(productId) {
  // Find the product with the specified productId
  const product = products.find((product) => product.productId === productId);

  // Increment the quantity of the found product
  ++product.quantity;
}

// Function to decrease the quantity of a product in the cart
function decreaseQuantity(productId) {
  // Find the product with the specified productId
  const product = products.find((product) => product.productId === productId);

  // Decrement the quantity of the found product
  --product.quantity;

  // If the quantity becomes zero, remove the product from the cart
  if (product.quantity === 0) {
    removeProductFromCart(productId);
  }
}

function removeProductFromCart(productId) {
  // Find the product in the cart with the specified productId
  let product = cart.find(product => product.productId === productId);

  // If the product is found
  if (product) {
    // If the product quantity is greater than or equal to 1, decrement the quantity
    if (product.quantity >= 1) {
      product.quantity -= 1;
    // Reset the quantity to 0
    product.quantity = 0;
    } else {
      // Otherwise, remove the product from the cart
      cart = cart.filter(product => product.productId !== productId);
      // Removes prtoduct from cart once it hits 0 
    } if (product.quantity === 0) {
      removeProductFromCart(productId);
    }
  }
}

// Function to calculate the total price of products in the cart
function cartTotal() {
  // Sum the price of all products, considering their quantity
  return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
}

// Variable to track the total amount paid
let totalPaid = 0;

// Function to handle payments
function pay(amount) {
  // Increase the total amount paid by the specified amount
  totalPaid += amount;

  // Calculate the remaining balance after payment
  let remainingBalance = totalPaid - cartTotal();

  // If the remaining balance covers the total cart price
  if (remainingBalance >= 0) {
    // Reset the totalPaid to zero
    totalPaid = 0;
    // Empty the cart
    emptyCart();
  }

  // Return the remaining balance after payment
  return remainingBalance;
}

// Function to empty the cart
function emptyCart() {
  // Set the cart to an empty array
  cart = [];
  // Reset the quantity of each product to 0
  products.forEach(product => product.quantity = 0);
}