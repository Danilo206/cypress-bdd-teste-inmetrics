import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../pages/ProductsPage';
import productDetailsPage from '../pages/ProductDetailsPage';
import cartPage from '../pages/CartPage';
import checkoutPage from '../pages/CheckoutPage';
import { addCurrentProductToCart, searchProduct, selectProduct } from '../actions/productActions';

Given('que acesso a página de carrinho sem produtos', () => {
	cartPage.visit();
	cartPage.clearCart();
});

When('adiciono o produto {string} ao carrinho', (productName) => {
	searchProduct(productName);
	productsPage.assertProductsDisplayed();
	selectProduct(productName);
	addCurrentProductToCart();
	productDetailsPage.assertProductAdded();
	productDetailsPage.openCartFromModal();
	cy.wrap(productName).as('productName');
});

When('clico no botão de checkout', () => {
	cartPage.checkout();
});

When('removo o produto do carrinho', () => {
	cartPage.removeProduct();
});

Then('visualizo os produtos inseridos com sucesso', () => {
	cy.get('@productName').then((productName) => cartPage.assertProductDisplayed(productName));
	cy.get('@productPrice').then((price) => cartPage.assertValues(price));
});

Then('visualizo os produtos inseridos em checkout com sucesso', () => {
	checkoutPage.assertDetailsDisplayed();
	cy.get('@productName').then((productName) => checkoutPage.assertProductDisplayed(productName));
	cy.get('@productPrice').then((price) => checkoutPage.assertValues(price));
});

Then('visualizo mensagem de carrinho vazio', () => {
	cartPage.assertEmpty();
});
