import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../pages/ProductsPage';
import productDetailsPage from '../pages/ProductDetailsPage';
import cartPage from '../pages/CartPage';
import checkoutPage from '../pages/CheckoutPage';
import cartAssertions from '../assertions/CartAssertions';
import checkoutAssertions from '../assertions/CheckoutAssertions';
import productsAssertions from '../assertions/ProductsAssertions';
import productDetailsAssertions from '../assertions/ProductDetailsAssertions';
import { addCurrentProductToCart, searchProduct, selectProduct } from '../actions/productActions';

Given('que acesso a página de carrinho sem produtos', () => {
	cartPage.visit();
	cartPage.clearCart();
});

When('adiciono o produto {string} ao carrinho', (productName) => {
	searchProduct(productName);
	productsAssertions.assertProductsDisplayed(productsPage.selectors, productsPage.searchTerm);
	selectProduct(productName);
	addCurrentProductToCart();
	productDetailsAssertions.assertProductAdded(productDetailsPage.selectors);
	productDetailsPage.openCartFromModal();
	cy.wrap(productName).as('productName');
});

When('prosseguo para o checkout', () => {
	cartPage.checkout();
});

When('removo o produto do carrinho', () => {
	cartPage.removeProduct();
});

Then('visualizo o produto {string} no carrinho', (productName) => {
	cartAssertions.assertProductDisplayed(cartPage.selectors, productName);
	cy.get('@productPrice').then((price) => cartAssertions.assertValues(cartPage.selectors, price));
});

Then('visualizo os produtos inseridos em checkout com sucesso', () => {
	checkoutAssertions.assertDetailsDisplayed(checkoutPage.selectors);
	cy.get('@productName').then((productName) => checkoutAssertions.assertProductDisplayed(checkoutPage.selectors, productName));
	cy.get('@productPrice').then((price) => checkoutAssertions.assertValues(checkoutPage.selectors, price));
});

Then('visualizo mensagem de carrinho vazio', () => {
	cartAssertions.assertEmpty(cartPage.selectors);
});
