import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import camposAutomationExercise from '../elements/campos_automationexercise';

const email = Cypress.env('AUTOMATIONEXERCISE_EMAIL') || Cypress.env('EMAIL') || '';
const password = Cypress.env('AUTOMATIONEXERCISE_PASSWORD') || Cypress.env('PASSWORD') || '';


Given('que acesso a página automationexercise login e insiro dados válidos', () => {
	cy.login(email, password);
});

Given(/^que acesso a página automationexercise (.+) e (.+) com dados inválidos$/, (login, password) => {
	cy.login(login, password);
});

Given(/^que acesso a página automationexercise (.*) e (.*) com dados faltantes$/, (login, password) => {
	cy.login(login, password);
});

Then('devo ser redirecionado para a página inicial', () => {
	cy.url().should('not.include', '/login');
	cy.get(camposAutomationExercise.logoutLink).should('exist');
	cy.get(camposAutomationExercise.deleteAccountLink).should('exist');
	cy.get(camposAutomationExercise.userIcon)
		.should('exist')
		.and('contain.text', 'Teste Automacao');
});

Then('devo ver uma mensagem de erro', () => {
	cy.get(camposAutomationExercise.loginErrorMessage)
		.should('be.visible')
		.and('contain.text', 'Your email or password is incorrect!');
});

Then('devo ver uma mensagem de erro de falta de preencimento de campos obrigatórios', () => {
	cy.get(camposAutomationExercise.requiredLoginField)
		.first()
		.invoke('prop', 'validationMessage')
		.should('contain', 'Preencha este campo');
});

When('clico em um item do menu produtos na lateral esquerda da página', () => {
	cy.get(camposAutomationExercise.poloBrandLink)
		.scrollIntoView()
		.should('be.visible')
		.click();
});

When('clico no item de Products do header da página', () => {
	cy.get(camposAutomationExercise.productsHeaderLink)
		.scrollIntoView()
		.should('be.visible')
		.click();
});

When('insiro o nome do produto {string} no campo de pesquisa', (productName) => {
	cy.get(camposAutomationExercise.searchProductInput)
		.should('be.visible')
		.clear()
		.type(productName);
});

When('clico no botão de pesquisa', () => {
	cy.get('#submit_search')
		.should('be.visible')
		.click();
});

When('clico no botão de view product', () => {
	cy.get(camposAutomationExercise.viewProductLink)
		.first()
		.scrollIntoView()
		.should('be.visible')
		.click();
});

When('clico no botão Add to cart', () => {
	cy.get(camposAutomationExercise.addToCartButton)
		.should('be.visible')
		.click();
});

Then('o modal de produto adicionado ao carrinho deve ser exibido', () => {
	cy.get(camposAutomationExercise.cartModal)
		.should('be.visible')
		.and('contain', 'Your product has been added to cart.');
	cy.get(camposAutomationExercise.cartModalHeader).should('be.visible');
	cy.get(camposAutomationExercise.cartModalBody).should('be.visible');
	cy.get(camposAutomationExercise.cartModalFooter).should('be.visible');
	cy.get(camposAutomationExercise.cartModalText).should('be.visible');
});

Then('devo ser redirecionado para a página de produtos com os produtos selecionados', () => {
	cy.get(camposAutomationExercise.productsItems).should('be.visible');
	cy.get(camposAutomationExercise.productsTitle)
		.should('be.visible');
	cy.get('.product-image-wrapper')
		.should('be.visible');
});

Then('devo ser redirecionado para a página de produtos sem exibir produtos', () => {
	cy.get(camposAutomationExercise.productsItems).should('be.visible');
	cy.get(camposAutomationExercise.productsTitle)
		.should('be.visible');
	cy.get('.product-image-wrapper').should('not.exist');
});
