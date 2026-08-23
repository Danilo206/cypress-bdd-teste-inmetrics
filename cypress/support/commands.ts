// Comandos Cypress personalizados podem ser adicionados aqui.
import camposLoginHome from './elements/login_home';

export {};

Cypress.Commands.add('clickVisible', (selector: string) => {
	cy.get(selector).should('be.visible').click();
});

Cypress.Commands.add('typeVisible', (selector: string, value: string) => {
	cy.get(selector).should('be.visible').clear().type(value);
});

Cypress.Commands.add('assertVisible', (selector: string) => {
	cy.get(selector).should('be.visible');
});

Cypress.Commands.add('assertVisibleContains', (selector: string, text: string) => {
	cy.get(selector).should('be.visible').and('contain.text', text);
});

Cypress.Commands.add('assertNotExists', (selector: string) => {
	cy.get(selector).should('not.exist');
});

Cypress.Commands.add('login', (email: string, password: string) => {
	cy.visit('/login');
	cy.get(camposLoginHome.loginEmail).clear();
	if (email) {
		cy.get(camposLoginHome.loginEmail).type(email);
	}
	cy.get(camposLoginHome.loginPassword).clear();
	if (password) {
		cy.get(camposLoginHome.loginPassword).type(password);
	}
	cy.get(camposLoginHome.loginButton).click();
});

declare global {
	namespace Cypress {
		interface Chainable {
			clickVisible(selector: string): Chainable;
			typeVisible(selector: string, value: string): Chainable;
			assertVisible(selector: string): Chainable;
			assertVisibleContains(selector: string, text: string): Chainable;
			assertNotExists(selector: string): Chainable;
			login(email: string, password: string): Chainable;
		}
	}
}
