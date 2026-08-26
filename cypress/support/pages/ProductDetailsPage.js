import { parseMonetaryValue } from '../utils/money';
import { CART_ROUTE } from './CartPage';

const cartModalFooter = '.modal-footer';

class ProductDetailsPage {
	selectors = {
		addToCartButton: '.btn.btn-default.cart',
		cartModal: '.modal-content',
		cartModalHeader: '.modal-header',
		cartModalBody: '.modal-body',
		cartModalFooter,
		cartModalContinueShoppingButton: '.close-modal, .close-checkout-modal',
		cartModalText: '.modal-body .text-center',
		cartHeaderLink: `.shop-menu.pull-right a[href="${CART_ROUTE}"]`,
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
		cy.get(this.selectors.cartModalText).should('be.visible').and('contain.text', 'added to cart');
	}

	openCartFromModal() {
		cy.get(this.selectors.cartModal).should('be.visible');
		cy.get(this.selectors.cartModalContinueShoppingButton).should('be.visible').click();
		cy.get(this.selectors.cartHeaderLink).should('be.visible').click();
	}
}

export default new ProductDetailsPage();
