const defaultBaseUrl = 'https://www.automationexercise.com/';
const trelloActionId = process.env.TRELLO_ACTION_ID || process.env.TRELLO || '';
const defaultTrelloActionUrl = trelloActionId ? `https://api.trello.com/1/actions/${trelloActionId}` : '';

export const environmentConfig = {
  baseUrl: process.env.CYPRESS_BASE_URL || defaultBaseUrl,
  trelloActionUrl: process.env.TRELLO_ACTION_URL || defaultTrelloActionUrl,
};
