class ProductDetailsAssertions {
	assertPrice(value, description) {
		expect(value, `${description} inválido`).to.be.a('number').and.greaterThan(0);
		return value;
	}

	assertProductAdded(selectors) {
		cy.get(selectors.cartModal).should('be.visible');
		cy.get(selectors.cartModalHeader).should('be.visible');
		cy.get(selectors.cartModalBody).should('be.visible');
		cy.get(selectors.cartModalFooter).should('be.visible');
		cy.get(selectors.cartModalText).should('be.visible').and('contain.text', 'added to cart');
	}
}

export default new ProductDetailsAssertions();