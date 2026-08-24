import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

const getTrelloActionUrl = () => {
	const env = Cypress.config('env') || {};
	const directUrl = env.TRELLO_ACTION_URL;

	if (directUrl) {
		return directUrl;
	}

	const trelloActionId = env.TRELLO_ACTION_ID || env.TRELLO || '';
	return trelloActionId ? `https://api.trello.com/1/actions/${trelloActionId}` : '';
};

Given('que realizo uma requisição GET para a API do Trello com dados válidos', () => {
	const url = getTrelloActionUrl();

	if (!url) {
		throw new Error('TRELLO_ACTION_URL or TRELLO_ACTION_ID is not configured. Set the Trello secret locally or in GitHub Actions before running the API tests.');
	}

	cy.request({
		method: 'GET',
		url,
	}).as('trelloResponse');
});

Given('que realizo uma requisição GET para a API do Trello com dados inválidos', () => {
	const invalidTrelloActionUrl = 'https://api.trello.com/1/actions/teste2026';

	cy.request({
		method: 'GET',
		url: invalidTrelloActionUrl,
		failOnStatusCode: false,
	}).as('trelloResponse');
});

Given('que realizo uma requisição GET para a API do Trello sem dados', () => {
	const emptyTrelloActionUrl = 'https://api.trello.com/1/actions/';

	cy.request({
		method: 'GET',
		url: emptyTrelloActionUrl,
		failOnStatusCode: false,
	}).as('trelloResponse');
});

Then('devo receber a resposta de sucesso com código 200', () => {
	cy.get('@trelloResponse').then((response) => {
		expect(response.status).to.eq(200);
		expect(response.body).to.not.be.null;
	});
});

Then('devo receber a resposta de erro com código 400', () => {
	cy.get('@trelloResponse').then((response) => {
		expect(response.status).to.eq(400);
	});
});

Then('devo receber a resposta de erro com código 404', () => {
	cy.get('@trelloResponse').then((response) => {
		expect(response.status).to.eq(404);
	});
});

Then('o campo name devidamente preenchido', () => {
	cy.get('@trelloResponse').then((response) => {
		expect(response.body).to.have.property('data');
		expect(response.body.data).to.have.property('list');
		expect(response.body.data.list).to.not.be.null;
		expect(response.body).to.have.nested.property('data.list.name');

		const listName = response.body.data.list.name;
		expect(listName).to.be.a('string');
		expect(listName.trim()).to.not.equal('');
		expect(listName.length).to.be.greaterThan(1);
	});
});

Then('o campo name não deve ser preenchido', () => {
	cy.get('@trelloResponse').then((response) => {
		expect(response.body).to.not.have.nested.property('data.list.name');
	});
});

Then('e a mensagem de erro deve ser enviada', () => {
	cy.get('@trelloResponse').then((response) => {
		expect(response.body).to.be.a('string');
		const message = response.body.toLowerCase();

		if (response.status === 400) {
			expect(message).to.include('invalid');
			return;
		}

		if (response.status === 404) {
			expect(message).to.include('cannot get');
			expect(message).to.include('/1/actions');
			return;
		}

		throw new Error(`Unexpected response status for error message validation: ${response.status}`);
	});
});


