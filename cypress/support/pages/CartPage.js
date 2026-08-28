import { cartTableSelectors } from './shared/cartTableSelectors';

export const CART_ROUTE = '/view_cart';

class CartPage {
	path = CART_ROUTE;

	selectors = {
		cartItems: cartTableSelectors.items,
		cartBreadcrumbs: cartTableSelectors.breadcrumbs,
		cartAction: '#do_action',
		cartProduct: '.cart_product',
		cartDescription: '.cart_description',
		cartProductName: cartTableSelectors.productName,
		cartPrice: cartTableSelectors.productPrice,
		cartQuantity: cartTableSelectors.productQuantity,
		cartTotal: '.cart_total',
		cartTotalPrice: cartTableSelectors.productTotal,
		cartDelete: '.cart_delete',
		emptyCart: '#empty_cart',
		checkoutButton: '.btn.btn-default.check_out',
	};

	visit() {
		cy.visit(this.path);
	}

	checkout() {
		cy.get(this.selectors.checkoutButton).should('be.visible').click();
	}

	removeProduct() {
		cy.get(this.selectors.cartDelete).then(($items) => {
			const remainingItems = $items.length - 1;
			cy.wrap($items.first()).should('be.visible').click();
			cy.get(this.selectors.cartDelete).should('have.length', remainingItems);
		});
	}

	clearCart() {
		cy.get('body').then(($body) => {
			if ($body.find(this.selectors.cartDelete).length > 0) {
				this.removeProduct();
				this.clearCart();
			}
		});
	}
}

export default new CartPage();
