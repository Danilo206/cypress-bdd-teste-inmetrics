class ProductDetailsPage {
	selectors = {
		addToCartButton: '.btn.btn-default.cart',
		cartModal: '.modal-content',
		cartModalHeader: '.modal-header',
		cartModalBody: '.modal-body',
		cartModalFooter: '.modal-footer',
		cartModalText: '.text-center',
		viewCartLink: 'a[href="/view_cart"][title="View Cart"], a[href="/view_cart"]:contains("View Cart")',
	};

	addToCart() {
		cy.get(this.selectors.addToCartButton).should('be.visible').click();
	}

	assertProductAdded() {
		cy.get(this.selectors.cartModal).should('be.visible');
		cy.get(this.selectors.cartModalHeader).should('be.visible');
		cy.get(this.selectors.cartModalBody).should('be.visible');
		cy.get(this.selectors.cartModalFooter).should('be.visible');
		cy.get(this.selectors.cartModalText).should('be.visible').and('contain.text', 'Your product has been added to cart.');
	}

	openCart() {
		cy.get(this.selectors.viewCartLink).should('be.visible').click();
	}
}

export default new ProductDetailsPage();
