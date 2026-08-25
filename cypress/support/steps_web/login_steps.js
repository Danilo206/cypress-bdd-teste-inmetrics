import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../pages/LoginPage';

const email = Cypress.env('AUTOMATIONEXERCISE_EMAIL') || Cypress.env('EMAIL') || '';
const password = Cypress.env('AUTOMATIONEXERCISE_PASSWORD') || Cypress.env('PASSWORD') || '';

Given('que acesso a página automationexercise login e insiro dados válidos', () => {
	loginPage.login(email, password);
});

Given(/^que acesso a página automationexercise (.+) e (.+) com dados inválidos$/, (login, password) => {
	loginPage.login(login, password);
});

Then('devo ser redirecionado para a página inicial', () => {
	loginPage.assertLoggedInUser('Teste Automacao');
});

Then('devo ver uma mensagem de erro', () => {
	loginPage.assertInvalidLoginMessage('Your email or password is incorrect!');
});

Then('devo ver uma mensagem de erro de falta de preencimento de campos obrigatórios', () => {
	loginPage.assertRequiredFieldMessage('Preencha este campo');
});
