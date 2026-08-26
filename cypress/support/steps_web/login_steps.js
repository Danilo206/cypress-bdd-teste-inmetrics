import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import loginPage from '../pages/LoginPage';

const email = Cypress.env('AUTOMATIONEXERCISE_EMAIL') || Cypress.env('EMAIL') || '';
const password = Cypress.env('AUTOMATIONEXERCISE_PASSWORD') || Cypress.env('PASSWORD') || '';

Given('que acesso a página automationexercise login e insiro dados válidos', () => {
	loginPage.login(email, password);
});

Given('que acesso a página automationexercise com login {string} e senha {string} inválidos', (login, password) => {
	loginPage.login(login, password);
});

Given('que acesso a página automationexercise com credenciais aleatórias inválidas', () => {
	loginPage.login(faker.internet.email(), faker.internet.password({ length: 12 }));
});

Then('devo ser redirecionado para a página inicial', () => {
	loginPage.assertLoggedInUser('Teste Automacao');
});

Then('devo ver uma mensagem de erro', () => {
	loginPage.assertInvalidLoginMessage('Your email or password is incorrect!');
});
