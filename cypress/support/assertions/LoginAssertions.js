class LoginAssertions {
	assertLoggedInUser(path, selectors, userName) {
		cy.url().should('not.include', path);
		cy.get(selectors.logoutLink).should('exist');
		cy.get(selectors.deleteAccountLink).should('exist');
		cy.get(selectors.userIcon).should('exist').and('contain.text', userName);
	}

	assertInvalidLoginMessage(selectors, message) {
		cy.get(selectors.loginErrorMessage).should('be.visible').and('contain.text', message);
	}
}

export default new LoginAssertions();
