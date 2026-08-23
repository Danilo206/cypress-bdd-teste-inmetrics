import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import camposAutomationExercise from '../elements/campos_automationexercise';

const email = Cypress.env('AUTOMATIONEXERCISE_EMAIL') || Cypress.env('EMAIL') || '';
const password = Cypress.env('AUTOMATIONEXERCISE_PASSWORD') || Cypress.env('SENHA') || '';

if (!email || !password) {
	throw new Error('AUTOMATIONEXERCISE_EMAIL e AUTOMATIONEXERCISE_PASSWORD devem estar configurados como secrets do GitHub Actions ou variáveis de ambiente locais.');
}

Given('que estou autenticado no sistema automationexercise com dados válidos', () => {
	cy.loginByPost(email, password);
});

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

Then('devo ser redirecionado para a página de produtos com os produtos selecionados', () => {
	cy.get(camposAutomationExercise.productsItems).should('be.visible');
	cy.get(camposAutomationExercise.productsTitle)
		.should('be.visible')
		.and('contain.text', 'Polo');
	cy.get(camposAutomationExercise.productsBreadcrumbs)
		.should('be.visible')
		.and('contain.text', 'Polo');
});
