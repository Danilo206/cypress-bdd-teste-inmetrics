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
		emptyCart: '#empty_cart',
		checkoutButton: '.btn.btn-default.check_out',
	};

	checkout() {
		cy.get(this.selectors.checkoutButton).should('be.visible').click();
	}

	removeProduct() {
		cy.get(this.selectors.cartDelete).first().should('be.visible').click();
		cy.get(this.selectors.cartDelete).should('not.exist');
	}

	clearCart() {
		cy.get('body').then(($body) => {
			if ($body.find(this.selectors.cartDelete).length > 0) {
				this.removeProduct();
			}
		});
	}

	assertEmpty() {
		cy.get(this.selectors.emptyCart)
			.should('have.css', 'display', 'block')
			.and('contain.text', 'Cart is empty!');
	}

	assertProductDisplayed(productName) {
		[
			'cartItems', 'cartBreadcrumbs', 'cartAction', 'cartProduct', 'cartDescription',
			'cartPrice', 'cartQuantity', 'cartTotal', 'cartTotalPrice', 'cartDelete',
		].forEach((selectorName) => cy.get(this.selectors[selectorName]).should('be.visible'));
		cy.get(this.selectors.cartProductName).should('contain.text', productName);
	}

	assertValues() {
		[this.selectors.cartPrice, this.selectors.cartQuantity, this.selectors.cartTotalPrice].forEach((selector) => {
			cy.get(selector).invoke('text').then((text) => {
				const numericText = text.match(/\d+(?:[.,]\d+)?/)?.[0];
				expect(numericText, `Valor não numérico encontrado em ${selector}`).to.exist;

				const value = Number(numericText.replace(',', '.'));

				expect(value).to.be.greaterThan(0);
			});
		});
	}
}

export default new CartPage();
