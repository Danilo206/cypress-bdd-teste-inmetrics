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
}

export default new CheckoutPage();
