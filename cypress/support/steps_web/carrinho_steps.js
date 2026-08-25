import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import cartPage from '../pages/CartPage';
import checkoutPage from '../pages/CheckoutPage';

Given('que acesso a página de carrinho sem produtos', () => {
	cy.visit('/view_cart');
	cartPage.clearCart();
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
