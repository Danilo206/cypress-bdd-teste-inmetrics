export const trelloValidContract = {
	id: 'string',
	idMemberCreator: 'string',
	data: {
		list: {
			id: 'string',
			name: 'Professional',
		},
		board: {
			name: 'string',
		},
		card: {
			name: 'string',
		},
	},
	type: 'updateCard',
	date: 'string',
	memberCreator: {
		username: 'string',
	},
};

export const validateTrelloContract = (body) => {
	const expected = trelloValidContract;

	expect(body).to.be.an('object');
	expect(body).to.have.property('id').that.is.a(expected.id);
	expect(body).to.have.property('idMemberCreator').that.is.a(expected.idMemberCreator);
	expect(body).to.have.property('data').that.is.an('object');
	expect(body.data).to.have.property('list').that.is.an('object');
	expect(body.data.list).to.have.property('name').that.is.a('string').and.equals(expected.data.list.name);
	expect(body.data.list).to.have.property('id').that.is.a(expected.data.list.id);
	expect(body.data).to.have.property('board').that.is.an('object');
	expect(body.data.board).to.have.property('name').that.is.a(expected.data.board.name);
	expect(body.data).to.have.property('card').that.is.an('object');
	expect(body.data.card).to.have.property('name').that.is.a(expected.data.card.name);
	expect(body).to.have.property('type').that.equals(expected.type);
	expect(body).to.have.property('date').that.is.a(expected.date);
	expect(body).to.have.property('memberCreator').that.is.an('object');
	expect(body.memberCreator).to.have.property('username').that.is.a(expected.memberCreator.username);
};

export const validateInvalidTrelloContract = (response) => {
	expect(response.status).to.eq(400);
	expect(response.body).to.be.a('string');
	const message = response.body.toLowerCase();
	expect(message).to.include('invalid');
	expect(message).to.include('id');
};
