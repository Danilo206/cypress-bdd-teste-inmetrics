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
		const readValue = (selector) =>
			cy.get(selector).then(($element) => {
				const rawValue = $element.val() || $element.text();
				const numericText = String(rawValue).match(/[\d.,]+/)?.[0];
				expect(numericText, `Valor não numérico encontrado em ${selector}`).to.exist;
				const lastComma = numericText.lastIndexOf(',');
				const lastDot = numericText.lastIndexOf('.');
				const normalizedText =
					lastComma > lastDot ? numericText.replace(/\./g, '').replace(',', '.') : numericText.replace(/,/g, '');
				return Number(normalizedText);
			});

		readValue(this.selectors.productPrice).then((price) => {
			expect(price).to.be.greaterThan(0).and.closeTo(expectedPrice, 0.01);
			readValue(this.selectors.productQuantity).then((quantity) => {
				expect(quantity).to.be.greaterThan(0);
				readValue(this.selectors.productTotal).then((total) => {
					expect(total).to.be.greaterThan(0);
					expect(total).to.be.closeTo(price * quantity, 0.01);
				});
			});
		});
	}
}

export default new CheckoutPage();
