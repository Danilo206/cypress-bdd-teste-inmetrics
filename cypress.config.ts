import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import { environmentConfig } from './config/environment';

export default defineConfig({
  e2e: {
    baseUrl: environmentConfig.baseUrl,
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    env: {
      AUTOMATIONEXERCISE_EMAIL: process.env.AUTOMATIONEXERCISE_EMAIL || process.env.EMAIL || '',
      AUTOMATIONEXERCISE_PASSWORD: process.env.AUTOMATIONEXERCISE_PASSWORD || process.env.PASSWORD || '',
    },
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
      return config;
    },
  },
});
