import { Then } from '@badeball/cypress-cucumber-preprocessor';
import {
	validateInvalidTrelloContract,
	validateTrelloContract,
} from '../contracts/trello.contract';

Then('o contrato da API deve ser validado com sucesso', () => {
	cy.get('@trelloResponse').then((response) => {
		expect(response.status).to.eq(200);
		validateTrelloContract(response.body);
	});
});

Then('o contrato de da API deve ser validado com sucesso', () => {
	cy.get('@trelloResponse').then((response) => {
		validateInvalidTrelloContract(response);
	});
});
