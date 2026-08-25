const defaultBaseUrl = 'https://www.automationexercise.com/';

export const environmentConfig = {
  baseUrl: process.env.CYPRESS_BASE_URL || defaultBaseUrl,
};
