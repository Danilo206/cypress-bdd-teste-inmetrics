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

	assertEmpty() {
		cy.get(this.selectors.emptyCart).should('have.css', 'display', 'block').and('contain.text', 'Cart is empty!');
	}

	assertProductDisplayed(productName) {
		[
			'cartItems',
			'cartBreadcrumbs',
			'cartAction',
			'cartProduct',
			'cartDescription',
			'cartPrice',
			'cartQuantity',
			'cartTotal',
			'cartTotalPrice',
			'cartDelete',
		].forEach((selectorName) => cy.get(this.selectors[selectorName]).should('be.visible'));
		cy.get(this.selectors.cartProductName).should('contain.text', productName);
	}

	assertValues(expectedPrice) {
		const readValue = (selector) =>
			cy.get(selector).then(($element) => {
				const rawValue = $element.val() || $element.text();
				const numericText = String(rawValue).match(/[\d.,]+/)?.[0];
				expect(numericText, `Valor não numérico encontrado em ${selector}`).to.exist;

				const lastComma = numericText.lastIndexOf(',');
				const lastDot = numericText.lastIndexOf('.');
				const normalizedText =
					lastComma > lastDot ? numericText.replace(/\./g, '').replace(',', '.') : numericText.replace(/,/g, '');
				return Number(normalizedText);
			});

		readValue(this.selectors.cartPrice).then((price) => {
			expect(price).to.be.greaterThan(0);
			if (expectedPrice !== undefined) {
				expect(price).to.be.closeTo(expectedPrice, 0.01);
			}

			readValue(this.selectors.cartQuantity).then((quantity) => {
				expect(quantity).to.be.greaterThan(0);

				readValue(this.selectors.cartTotalPrice).then((total) => {
					expect(total).to.be.greaterThan(0);
					expect(total).to.be.closeTo(price * quantity, 0.01);
				});
			});
		});
	}
}

export default new CartPage();
