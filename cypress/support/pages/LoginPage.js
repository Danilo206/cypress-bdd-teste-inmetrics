class LoginPage {
	selectors = {
		email: '[data-qa="login-email"]',
		password: '[data-qa="login-password"]',
		loginButton: '[data-qa="login-button"]',
		logoutLink: 'a[href="/logout"]',
		deleteAccountLink: 'a[href="/delete_account"]',
		userIcon: 'i.fa-user',
		loginErrorMessage: 'p[style="color: red;"]',
		requiredField: '[data-qa="login-email"]:invalid, [data-qa="login-password"]:invalid',
	};

	visit() {
		cy.visit('/login');
	}

	fillCredentials(email, password) {
		cy.get(this.selectors.email).clear();
		if (email) {
			cy.get(this.selectors.email).type(email);
		}

		cy.get(this.selectors.password).clear();
		if (password) {
			cy.get(this.selectors.password).type(password, { log: false });
		}
	}

	login(email, password) {
		this.visit();
		this.fillCredentials(email, password);
		cy.get(this.selectors.loginButton).click();
	}

	assertLoggedInUser(userName) {
		cy.url().should('not.include', '/login');
		cy.get(this.selectors.logoutLink).should('exist');
		cy.get(this.selectors.deleteAccountLink).should('exist');
		cy.get(this.selectors.userIcon).should('exist').and('contain.text', userName);
	}

	assertInvalidLoginMessage(message) {
		cy.get(this.selectors.loginErrorMessage).should('be.visible').and('contain.text', message);
	}

	assertRequiredFieldMessage(message) {
		cy.get(this.selectors.requiredField).first().invoke('prop', 'validationMessage').should('contain', message);
	}
}

export default new LoginPage();
