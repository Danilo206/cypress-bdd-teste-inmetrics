class TrelloService {
	getAction(url) {
		return cy.request({
			method: 'GET',
			url,
		});
	}

	getInvalidAction() {
		return cy.request({
			method: 'GET',
			url: 'https://api.trello.com/1/actions/teste2026',
			failOnStatusCode: false,
		});
	}

	getWithoutActionId() {
		return cy.request({
			method: 'GET',
			url: 'https://api.trello.com/1/actions/',
			failOnStatusCode: false,
		});
	}
}

export default new TrelloService();
