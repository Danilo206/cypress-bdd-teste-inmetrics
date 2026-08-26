class LoginPage {
	path = '/login';

	selectors = {
		email: '[data-qa="login-email"]',
		password: '[data-qa="login-password"]',
		loginButton: '[data-qa="login-button"]',
		logoutLink: 'a[href="/logout"]',
		deleteAccountLink: 'a[href="/delete_account"]',
		userIcon: 'a:has(.fa.fa-user)',
		loginErrorMessage: 'p[style="color: red;"]',
	};

	visit() {
		cy.visit(this.path);
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
		if (!email || !password) {
			throw new Error(
				'Credenciais do Automation Exercise não configuradas. Defina AUTOMATIONEXERCISE_EMAIL e AUTOMATIONEXERCISE_PASSWORD no .env local ou no GitHub Actions.',
			);
		}

		this.visit();
		this.fillCredentials(email, password);
		cy.get(this.selectors.loginButton).click();
	}

	assertLoggedInUser(userName) {
		cy.url().should('not.include', this.path);
		cy.get(this.selectors.logoutLink).should('exist');
		cy.get(this.selectors.deleteAccountLink).should('exist');
		cy.get(this.selectors.userIcon).should('exist').and('contain.text', userName);
	}

	assertInvalidLoginMessage(message) {
		cy.get(this.selectors.loginErrorMessage).should('be.visible').and('contain.text', message);
	}
}

export default new LoginPage();
