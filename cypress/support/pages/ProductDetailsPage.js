class ProductDetailsPage {
	selectors = {
		addToCartButton: '.btn.btn-default.cart',
		cartModal: '.modal-content',
		cartModalHeader: '.modal-header',
		cartModalBody: '.modal-body',
		cartModalFooter: '.modal-footer',
		cartModalText: '.text-center',
		productPrice: '.product-information span span',
		viewCartLink: 'a[href="/view_cart"][title="View Cart"], a[href="/view_cart"]:contains("View Cart")',
	};

	capturePrice() {
		return cy
			.get(this.selectors.productPrice)
			.invoke('text')
			.then((text) => {
				const numericText = text.match(/[\d.,]+/)?.[0];
				expect(numericText, 'Preço do produto não encontrado').to.exist;
				return Number(numericText.replace(/,/g, ''));
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

	openCart() {
		cy.get(this.selectors.viewCartLink).should('be.visible').click();
	}
}

export default new ProductDetailsPage();
