        // Sample data for demonstration - replace with your actual cart data
        let cart = [
            {
                id: 1,
                name: "Premium Wireless Headphones",
                price: 1299,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
            },
            {
                id: 2,
                name: "Smart Watch Series X",
                price: 2499,
                quantity: 2,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop"
            },
            {
                id: 3,
                name: "Bluetooth Speaker",
                price: 799,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop"
            }
        ];

        let promoDiscount = 0;
        const shippingCost = 50;

        function loadCart() {
            const cartItemsContainer = document.getElementById('cart-items');
            const emptyCart = document.getElementById('empty-cart');
            const cartSummary = document.getElementById('cart-summary');
            const cartActions = document.getElementById('cart-actions');

            if (cart.length === 0) {
                emptyCart.style.display = 'block';
                cartSummary.style.display = 'none';
                cartActions.style.display = 'none';
                return;
            }

            emptyCart.style.display = 'none';
            cartSummary.style.display = 'block';
            cartActions.style.display = 'flex';

            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item fade-in" data-id="${item.id}">
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <div class="d-flex align-items-center gap-3">
                        <img src="${item.image}" alt="${item.name}" class="item-image">
                        
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-price">R${item.price.toFixed(2)}</div>
                        </div>
                        
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <div class="quantity-display">${item.quantity}</div>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        
                        <div class="text-end" style="min-width: 120px;">
                            <div class="item-price">R${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            `).join('');

            updateCartSummary();
        }

        function updateQuantity(id, newQuantity) {
            if (newQuantity <= 0) {
                removeFromCart(id);
                return;
            }

            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex >= 0) {
                cart[itemIndex].quantity = newQuantity;
                loadCart();
            }
        }

        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            loadCart();
        }

        function updateCartSummary() {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const discount = subtotal * (promoDiscount / 100);
            const total = subtotal + shippingCost - discount;

            document.getElementById('subtotal').textContent = `R${subtotal.toFixed(2)}`;
            document.getElementById('shipping').textContent = subtotal >= 1000 ? 'FREE' : `R${shippingCost.toFixed(2)}`;
            document.getElementById('discount').textContent = `-R${discount.toFixed(2)}`;
            document.getElementById('total').textContent = `R${total.toFixed(2)}`;

            const discountRow = document.getElementById('discount-row');
            discountRow.style.display = discount > 0 ? 'flex' : 'none';
        }

        function applyPromoCode() {
            const promoCode = document.getElementById('promoCode').value.trim().toLowerCase();
            const promoCodes = {
                'save10': 10,
                'welcome15': 15,
                'student20': 20
            };

            if (promoCodes[promoCode]) {
                promoDiscount = promoCodes[promoCode];
                updateCartSummary();
                showNotification(`Promo code applied! ${promoDiscount}% discount`, 'success');
                document.getElementById('promoCode').value = '';
            } else {
                showNotification('Invalid promo code', 'error');
            }
        }

        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} position-fixed`;
            notification.style.cssText = 'top: 20px; right: 20px; z-index: 1000; min-width: 300px;';
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
                ${message}
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        function continueShopping() {
            showNotification('Redirecting to shop...', 'success');
            // window.location.href = 'shop.html';
        }

        function proceedToCheckout() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            showNotification('Redirecting to secure checkout...', 'success');
            // window.location.href = 'checkout.html';
        }

        // Load cart on page load
        document.addEventListener('DOMContentLoaded', () => {
            loadCart();
            updateCartIcon();
        });