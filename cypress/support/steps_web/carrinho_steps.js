import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import camposBuscaHome from '../elements/busca_home';
import camposCarrinhoCheckout from '../elements/carrinho_checkout';
import camposInsercaoProduto from '../elements/insercao_produto';

const getEmail = () => {
	const env = Cypress.config('env') || {};
	return env.AUTOMATIONEXERCISE_EMAIL || env.EMAIL || '';
};

const getPassword = () => {
	const env = Cypress.config('env') || {};
	return env.AUTOMATIONEXERCISE_PASSWORD || env.PASSWORD || '';
};

Given('que acesso a página de carrinho', () => {
	cy.login(getEmail(), getPassword());
	cy.visit('/products');
	cy.clickVisible(camposBuscaHome.productsHeaderLink);
	cy.typeVisible(camposBuscaHome.searchProductInput, 'Polo');
	cy.clickVisible(camposBuscaHome.searchProductButton);
	cy.assertVisible(camposBuscaHome.productsItems);
	cy.assertVisible(camposBuscaHome.productsTitle);
	cy.get(camposBuscaHome.viewProductLink).first().click();
	cy.clickVisible(camposInsercaoProduto.addToCartButton);
	cy.assertVisible(camposInsercaoProduto.cartModal);
	cy.clickVisible(camposInsercaoProduto.viewCartLink);
});

When('clico no botão de checkout', () => {
	cy.clickVisible(camposCarrinhoCheckout.checkoutButton);
});

Then('visualizo os produtos inseridos com sucesso', () => {
	cy.assertVisible(camposCarrinhoCheckout.cartItems);
	cy.assertVisible(camposCarrinhoCheckout.cartBreadcrumbs);
	cy.assertVisible(camposCarrinhoCheckout.cartAction);
	cy.assertVisible(camposCarrinhoCheckout.cartProduct);
	cy.assertVisible(camposCarrinhoCheckout.cartDescription);
	cy.assertVisible(camposCarrinhoCheckout.cartPrice);
	cy.assertVisible(camposCarrinhoCheckout.cartQuantity);
	cy.assertVisible(camposCarrinhoCheckout.cartTotal);
	cy.assertVisible(camposCarrinhoCheckout.cartTotalPrice);
	cy.assertVisible(camposCarrinhoCheckout.cartDelete);
});

Then('visualizo os produtos inseridos em checkout com sucesso', () => {
	cy.assertVisible(camposCarrinhoCheckout.checkoutCartItems);
	cy.assertVisibleContains(camposCarrinhoCheckout.checkoutBreadcrumbs, 'Checkout');
	cy.assertVisibleContains(camposCarrinhoCheckout.checkoutHeading, 'Address Details');
	cy.assertVisible(camposCarrinhoCheckout.checkoutInfo);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAddressBox);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAddressTitle);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAddressName);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAddressStreet);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAddressLocation);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAddressCountry);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAddressPhone);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAlternateAddressBox);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAlternateTitle);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAlternateName);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAlternateStreet);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAlternateLocation);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAlternateCountry);
	cy.assertVisible(camposCarrinhoCheckout.checkoutAlternatePhone);
});
