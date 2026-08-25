class CheckoutPage {
	selectors = {
		cartItems: '#cart_items',
		productName: '.cart_description h4 a',
		productPrice: '.cart_price',
		productQuantity: '.cart_quantity',
		productTotal: '.cart_total_price',
		breadcrumbs: '.breadcrumbs',
		heading: '.heading',
		info: '[data-qa="checkout-info"]',
		addressBox: '.address.item.box',
		addressTitle: '.address_title',
		addressName: '.address_firstname.address_lastname',
		addressStreet: '.address_address1.address_address2',
		addressLocation: '.address_city.address_state_name.address_postcode',
		addressCountry: '.address_country_name',
		addressPhone: '.address_phone',
		alternateAddressBox: '.address.alternate_item.box',
		alternateTitle: '.address.alternate_item.box .address_title',
		alternateName: '.address.alternate_item.box .address_firstname.address_lastname',
		alternateStreet: '.address.alternate_item.box .address_address1.address_address2',
		alternateLocation: '.address.alternate_item.box .address_city.address_state_name.address_postcode',
		alternateCountry: '.address.alternate_item.box .address_country_name',
		alternatePhone: '.address.alternate_item.box .address_phone',
	};

	assertDetailsDisplayed() {
		const selectors = [
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
		];

		selectors.forEach((selectorName) => cy.get(this.selectors[selectorName]).should('be.visible'));
	}

	assertProductDisplayed(productName) {
		cy.get(this.selectors.productName).should('contain.text', productName);
	}

	assertValues(expectedPrice) {
		const parseValue = (text, selector) => {
			const numericText = text.match(/[\d.,]+/)?.[0];
			expect(numericText, `Valor não numérico encontrado em ${selector}`).to.exist;
			return Number(numericText.replace(/,/g, ''));
		};

		cy.get(this.selectors.productPrice)
			.invoke('text')
			.then((text) => {
				expect(parseValue(text, this.selectors.productPrice)).to.be.closeTo(expectedPrice, 0.01);
			});
		cy.get(this.selectors.productQuantity)
			.invoke('text')
			.then((text) => {
				const quantity = parseValue(text, this.selectors.productQuantity);
				expect(quantity).to.be.greaterThan(0);
				cy.get(this.selectors.productPrice)
					.invoke('text')
					.then((priceText) => {
						const price = parseValue(priceText, this.selectors.productPrice);
						cy.get(this.selectors.productTotal)
							.invoke('text')
							.then((totalText) => {
								const total = parseValue(totalText, this.selectors.productTotal);
								expect(total).to.be.greaterThan(0);
								expect(total).to.be.closeTo(price * quantity, 0.01);
							});
					});
			});
	}
}

export default new CheckoutPage();
