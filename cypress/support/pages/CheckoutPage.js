import { parseMonetaryValue } from '../utils/money';
import { cartTableSelectors } from './shared/cartTableSelectors';

const addressSelectors = {
	addressTitle: '.address_title',
	addressName: '.address_firstname.address_lastname',
	addressStreet: '.address_address1.address_address2',
	addressLocation: '.address_city.address_state_name.address_postcode',
	addressCountry: '.address_country_name',
	addressPhone: '.address_phone',
};

const alternateAddressBox = '.address.alternate_item.box';
const alternateAddressSelectors = Object.fromEntries(
	Object.entries(addressSelectors).map(([key, selector]) => [
		key.replace('address', 'alternate'),
		`${alternateAddressBox} ${selector}`,
	]),
);

class CheckoutPage {
	selectors = {
		cartItems: cartTableSelectors.items,
		productName: cartTableSelectors.productName,
		productPrice: cartTableSelectors.productPrice,
		productQuantity: cartTableSelectors.productQuantity,
		productTotal: cartTableSelectors.productTotal,
		breadcrumbs: cartTableSelectors.breadcrumbs,
		heading: '.heading',
		info: '[data-qa="checkout-info"]',
		addressBox: '.address.item.box',
		...addressSelectors,
		alternateAddressBox,
		...alternateAddressSelectors,
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
				return parseMonetaryValue(rawValue, `Valor em ${selector}`);
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
