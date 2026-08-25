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
		const parseValue = (text, selector) => {
			const numericText = text.match(/[\d.,]+/)?.[0];
			expect(numericText, `Valor não numérico encontrado em ${selector}`).to.exist;
			return Number(numericText.replace(/,/g, ''));
		};

		cy.get(this.selectors.cartPrice)
			.invoke('text')
			.then((priceText) => {
				const price = parseValue(priceText, this.selectors.cartPrice);
				expect(price).to.be.greaterThan(0);
				if (expectedPrice !== undefined) {
					expect(price).to.be.closeTo(expectedPrice, 0.01);
				}

				cy.get(this.selectors.cartQuantity)
					.invoke('text')
					.then((quantityText) => {
						const quantity = parseValue(quantityText, this.selectors.cartQuantity);
						expect(quantity).to.be.greaterThan(0);

						cy.get(this.selectors.cartTotalPrice)
							.invoke('text')
							.then((totalText) => {
								const total = parseValue(totalText, this.selectors.cartTotalPrice);
								expect(total).to.be.greaterThan(0);
								expect(total).to.be.closeTo(price * quantity, 0.01);
							});
					});
			});
	}
}

export default new CartPage();
