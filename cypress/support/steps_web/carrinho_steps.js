import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../pages/ProductsPage';
import productDetailsPage from '../pages/ProductDetailsPage';
import cartPage from '../pages/CartPage';
import checkoutPage from '../pages/CheckoutPage';

const addProductToCart = (productName) => {
	productsPage.openFromHeader();
	productsPage.fillSearch(productName);
	productsPage.search();
	productsPage.assertProductsDisplayed();
	productsPage.openProduct(productName);
	productDetailsPage.capturePrice();
	productDetailsPage.addToCart();
	productDetailsPage.assertProductAdded();
	productDetailsPage.openCart();
};

Given('que acesso a página de carrinho sem produtos', () => {
	cy.visit('/view_cart');
	cartPage.clearCart();
});

Given(/^que adiciono o produto (.+) ao carrinho$/, (productName) => {
	addProductToCart(productName);
});

When('clico no link View Cart', () => {
	cy.get('a[href="/view_cart"]').filter(':visible').first().click();
});

When('clico no botão de checkout', () => {
	cartPage.checkout();
});

When('removo o produto do carrinho', () => {
	cartPage.removeProduct();
});

Then('visualizo os produtos inseridos com sucesso', () => {
	cartPage.assertProductDisplayed('Polo');
	cy.get('@productPrice').then((price) => cartPage.assertValues(price));
});

Then('visualizo os produtos inseridos em checkout com sucesso', () => {
	checkoutPage.assertDetailsDisplayed();
	checkoutPage.assertProductDisplayed('Polo');
	cy.get('@productPrice').then((price) => checkoutPage.assertValues(price));
});

Then('visualizo mensagem de carrinho vazio', () => {
	cartPage.assertEmpty();
});
