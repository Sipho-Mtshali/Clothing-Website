let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
    const itemIndex = cart.findIndex(item => item.id === product.id);
    if (itemIndex >= 0) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartIcon();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.fa-cart-arrow-down + span');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartIcon.textContent = totalItems;
}

function loadCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between">
            <span>${item.name} x ${item.quantity}</span>
            <span>R${item.price * item.quantity}</span>
        </div>
    `).join('');
}

function redirectToCheckout() {
    window.location.href = "checkout.html";
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartIcon();
    if (document.getElementById("cart-items")) {
        loadCart();
    }
});
