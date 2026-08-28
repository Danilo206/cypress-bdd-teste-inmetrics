class ProductsPage {
	selectors = {
		productsHeaderLink: '.shop-menu.pull-right a[href="/products"]',
		productsItems: '.features_items',
		productsTitle: '.title.text-center',
		productsSidebarMenuItem: '.brands_products',
		searchProductInput: '#search_product',
		searchProductButton: '#submit_search',
		viewProductLink: 'a[href^="/product_details/"]',
		productImage: '.product-image-wrapper',
	};

	openFromHeader() {
		this.searchTerm = undefined;
		cy.get(this.selectors.productsHeaderLink).should('be.visible').click();
	}

	openFromSidebar() {
		this.searchTerm = undefined;
		cy.get(this.selectors.productsSidebarMenuItem).first().scrollIntoView();
		cy.get(this.selectors.productsSidebarMenuItem).first().should('be.visible').click();
	}

	fillSearch(productName) {
		this.searchTerm = productName;
		cy.get(this.selectors.searchProductInput).should('be.visible');
		cy.get(this.selectors.searchProductInput).clear();
		cy.get(this.selectors.searchProductInput).type(productName);
	}

	search() {
		cy.get(this.selectors.searchProductButton).should('be.visible').click();
	}

	openProduct(productName) {
		cy.contains(`${this.selectors.productImage} .productinfo p`, productName)
			.should('be.visible')
			.closest(this.selectors.productImage)
			.find(this.selectors.viewProductLink)
			.should('be.visible')
			.click();
	}
}

export default new ProductsPage();
