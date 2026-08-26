import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import trelloService from '../services/TrelloService';

const trelloActionUrl = Cypress.env('TRELLO_ACTION_URL');

Given('que realizo uma requisição GET para a API do Trello com dados válidos', () => {
	if (!trelloActionUrl) {
		throw new Error('TRELLO_ACTION_URL não configurada.');
	}

	trelloService.getAction(trelloActionUrl).as('trelloResponse');
});

Given('que realizo uma requisição GET para a API do Trello com dados inválidos', () => {
	trelloService.getInvalidAction().as('trelloResponse');
});

Given('que realizo uma requisição GET para a API do Trello sem dados', () => {
	trelloService.getWithoutActionId().as('trelloResponse');
});

Given(
	'que realizo uma requisição GET para a API do Trello com dados válidos e o header Accept {string}',
	(acceptHeader) => {
		if (!trelloActionUrl) {
			throw new Error('TRELLO_ACTION_URL não configurada.');
		}

		trelloService.getActionWithHeaders(trelloActionUrl, { Accept: acceptHeader }).as('trelloResponse');
	},
);

Given(
	'que realizo uma requisição GET para a API do Trello com dados válidos e um header customizado {string} definido como {string}',
	(headerName, headerValue) => {
		if (!trelloActionUrl) {
			throw new Error('TRELLO_ACTION_URL não configurada.');
		}

		trelloService.getActionWithHeaders(trelloActionUrl, { [headerName]: headerValue }).as('trelloResponse');
	},
);

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

Then('o header content-type da resposta deve conter {string}', (expectedContentType) => {
	cy.get('@trelloResponse').then((response) => {
		expect(response.headers).to.have.property('content-type');
		expect(response.headers['content-type']).to.include(expectedContentType);
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
