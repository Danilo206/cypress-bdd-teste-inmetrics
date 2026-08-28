import { readMonetaryValue } from '../utils/money';

class CartAssertions {
	assertEmpty(selectors) {
		cy.get(selectors.emptyCart).should('have.css', 'display', 'block').and('contain.text', 'Cart is empty!');
	}

	assertProductDisplayed(selectors, productName) {
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
		].forEach((selectorName) => cy.get(selectors[selectorName]).should('be.visible'));
		cy.get(selectors.cartProductName).should('contain.text', productName);
	}

	assertValues(selectors, expectedPrice) {
		readMonetaryValue(selectors.cartPrice).then((price) => {
			expect(price).to.be.greaterThan(0);
			if (expectedPrice !== undefined) {
				expect(price).to.be.closeTo(expectedPrice, 0.01);
			}

			readMonetaryValue(selectors.cartQuantity).then((quantity) => {
				expect(quantity).to.be.greaterThan(0);

				readMonetaryValue(selectors.cartTotalPrice).then((total) => {
					expect(total).to.be.greaterThan(0);
					expect(total).to.be.closeTo(price * quantity, 0.01);
				});
			});
		});
	}
}

export default new CartAssertions();