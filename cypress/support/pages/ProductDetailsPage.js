import { parseMonetaryValue } from '../utils/money';

class ProductDetailsPage {
	selectors = {
		addToCartButton: '.btn.btn-default.cart',
		cartModal: '.modal-content',
		cartModalHeader: '.modal-header',
		cartModalBody: '.modal-body',
		cartModalFooter: '.modal-footer',
		cartModalText: '.text-center',
		productPrice: '.product-information span span',
	};

	parseValue(rawValue, description) {
		const value = parseMonetaryValue(rawValue, description);
		expect(value, `${description} inválido`).to.be.a('number').and.greaterThan(0);
		return value;
	}

	capturePrice() {
		return cy
			.get(this.selectors.productPrice)
			.invoke('text')
			.then((text) => {
				return this.parseValue(text, 'Preço do produto');
			})
			.as('productPrice');
	}

	addToCart() {
		cy.get(this.selectors.addToCartButton).should('be.visible').click();
	}

	assertProductAdded() {
		cy.get(this.selectors.cartModal).should('be.visible');
		cy.get(this.selectors.cartModalHeader).should('be.visible');
		cy.get(this.selectors.cartModalBody).should('be.visible');
		cy.get(this.selectors.cartModalFooter).should('be.visible');
		cy.get(this.selectors.cartModalText)
			.should('be.visible')
			.and('contain.text', 'Your product has been added to cart.');
	}
}

export default new ProductDetailsPage();
