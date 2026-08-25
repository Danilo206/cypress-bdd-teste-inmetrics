class CartPage {
	selectors = {
		cartItems: '#cart_items',
		cartBreadcrumbs: '.breadcrumbs',
		cartAction: '#do_action',
		cartProduct: '.cart_product',
		cartDescription: '.cart_description',
		cartProductName: '.cart_description h4 a',
		cartPrice: '.cart_price',
		cartQuantity: '.cart_quantity',
		cartTotal: '.cart_total',
		cartTotalPrice: '.cart_total_price',
		cartDelete: '.cart_delete',
		checkoutButton: '.btn.btn-default.check_out',
	};

	checkout() {
		cy.get(this.selectors.checkoutButton).should('be.visible').click();
	}

	assertProductDisplayed(productName) {
		[
			'cartItems', 'cartBreadcrumbs', 'cartAction', 'cartProduct', 'cartDescription',
			'cartPrice', 'cartQuantity', 'cartTotal', 'cartTotalPrice', 'cartDelete',
		].forEach((selectorName) => cy.get(this.selectors[selectorName]).should('be.visible'));
		cy.get(this.selectors.cartProductName).should('contain.text', productName);
	}

	assertValues() {
		cy.get(this.selectors.cartPrice).invoke('text').should('match', /\d/);
		cy.get(this.selectors.cartQuantity).invoke('text').should('match', /\d/);
		cy.get(this.selectors.cartTotalPrice).invoke('text').should('match', /\d/);
	}
}

export default new CartPage();
