import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../pages/LoginPage';
import productsPage from '../pages/ProductsPage';
import productDetailsPage from '../pages/ProductDetailsPage';
import cartPage from '../pages/CartPage';
import checkoutPage from '../pages/CheckoutPage';

const email = Cypress.env('AUTOMATIONEXERCISE_EMAIL') || Cypress.env('EMAIL') || '';
const password = Cypress.env('AUTOMATIONEXERCISE_PASSWORD') || Cypress.env('PASSWORD') || '';

const addPoloToCart = () => {
	productsPage.visit();
	productsPage.openFromHeader();
	productsPage.fillSearch('Polo');
	productsPage.search();
	productsPage.assertProductsDisplayed();
	productsPage.openFirstProduct();
	productDetailsPage.addToCart();
	productDetailsPage.assertProductAdded();
	productDetailsPage.openCart();
};

Given('que acesso a página de carrinho', () => {
	loginPage.login(email, password);
	cy.visit('/view_cart');
});

Given('que acesso a página de carrinho sem produtos', () => {
	loginPage.login(email, password);
	cy.visit('/view_cart');
});

Given('que adiciono o produto Polo ao carrinho', () => {
	loginPage.login(email, password);
	addPoloToCart();
});

When('clico no botão de checkout', () => {
	cartPage.checkout();
});

When('removo o produto do carrinho', () => {
	cy.get('.cart_delete').first().click({ force: true });
});

Then('visualizo os produtos inseridos com sucesso', () => {
	cartPage.assertProductDisplayed('Polo');
	cartPage.assertValues();
});

Then('visualizo os produtos inseridos em checkout com sucesso', () => {
	checkoutPage.assertDetailsDisplayed();
	checkoutPage.assertProductDisplayed('Polo');
});

Then('visualizo mensagem de carrinho vazio', () => {
	cy.contains('Cart is empty!').should('be.visible');
});
