import { readMonetaryValue } from '../utils/money';

class CheckoutAssertions {
	assertDetailsDisplayed(selectors) {
		[
			'cartItems',
			'breadcrumbs',
			'heading',
			'info',
			'addressBox',
			'addressTitle',
			'addressName',
			'addressStreet',
			'addressLocation',
			'addressCountry',
			'addressPhone',
			'alternateAddressBox',
			'alternateTitle',
			'alternateName',
			'alternateStreet',
			'alternateLocation',
			'alternateCountry',
			'alternatePhone',
		].forEach((selectorName) => cy.get(selectors[selectorName]).should('be.visible'));
	}

	assertProductDisplayed(selectors, productName) {
		cy.get(selectors.productName).should('contain.text', productName);
	}

	assertValues(selectors, expectedPrice) {
		readMonetaryValue(selectors.productPrice).then((price) => {
			expect(price).to.be.greaterThan(0).and.closeTo(expectedPrice, 0.01);
			readMonetaryValue(selectors.productQuantity).then((quantity) => {
				expect(quantity).to.be.greaterThan(0);
				readMonetaryValue(selectors.productTotal).then((total) => {
					expect(total).to.be.greaterThan(0);
					expect(total).to.be.closeTo(price * quantity, 0.01);
				});
			});
		});
	}
}

export default new CheckoutAssertions();
