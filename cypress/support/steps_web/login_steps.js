import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import camposLoginHome from '../elements/login_home';

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
	cy.get(camposLoginHome.logoutLink).should('exist');
	cy.get(camposLoginHome.deleteAccountLink).should('exist');
	cy.get(camposLoginHome.userIcon).should('exist').and('contain.text', 'Teste Automacao');
});

Then('devo ver uma mensagem de erro', () => {
	cy.assertVisibleContains(camposLoginHome.loginErrorMessage, 'Your email or password is incorrect!');
});

Then('devo ver uma mensagem de erro de falta de preencimento de campos obrigatórios', () => {
	cy.get(camposLoginHome.requiredLoginField).first().invoke('prop', 'validationMessage').should('contain', 'Preencha este campo');
});
