import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../pages/ProductsPage';
import productDetailsPage from '../pages/ProductDetailsPage';
import cartPage from '../pages/CartPage';
import checkoutPage from '../pages/CheckoutPage';

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
	cy.visit('/view_cart');
});

Given('que acesso a página de carrinho sem produtos', () => {
	cy.visit('/view_cart');
});

Given('que adiciono o produto Polo ao carrinho', () => {
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
	cy.get('#empty_cart').should('be.visible').and('contain.text', 'Cart is empty!');
});
