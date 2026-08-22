// Comandos Cypress personalizados podem ser adicionados aqui.
import camposAutomationExercise from './elements/campos_automationexercise';

export {};

Cypress.Commands.add('login', (email: string, password: string) => {
	cy.visit('/login');
	cy.get(camposAutomationExercise.loginEmail).clear();
	if (email) {
		cy.get(camposAutomationExercise.loginEmail).type(email);
	}
	cy.get(camposAutomationExercise.loginPassword).clear();
	if (password) {
		cy.get(camposAutomationExercise.loginPassword).type(password);
	}
    cy.get(camposAutomationExercise.loginButton).click();
});

Cypress.Commands.add('loginByPost', (email: string, password: string) => {
	cy.request({
		method: 'POST',
		url: 'https://automationexercise.com/api/verifyLogin',
		form: true,
		body: { email, password },
	});
	cy.visit('/');
});


declare global {
	namespace Cypress {
		interface Chainable {
			login(email: string, password: string): Chainable;
			loginByPost(email: string, password: string): Chainable;
		}
	}
}
