class ProductsAssertions {
	assertProductsDisplayed(selectors, searchTerm) {
		cy.get(selectors.productsItems).should('be.visible');
		cy.get(selectors.productsTitle).should('be.visible');
		cy.get(selectors.productImage).should('be.visible');
		if (searchTerm) {
			cy.get(`${selectors.productImage} .productinfo p`).each(($productName) => {
				cy.wrap($productName).should('contain.text', searchTerm);
			});
		}
	}

	assertNoProductsDisplayed(selectors) {
		cy.get(selectors.productsItems).should('be.visible');
		cy.get(selectors.productsTitle).should('be.visible');
		cy.get(selectors.productImage).should('not.exist');
	}
}

export default new ProductsAssertions();