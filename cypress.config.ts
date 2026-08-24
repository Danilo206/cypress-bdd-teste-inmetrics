import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import { environmentConfig } from './config/environment';
import allureWriter from '@shelex/cypress-allure-plugin/writer';

const loadLocalEnv = () => {
  const envPath = path.resolve(process.cwd(), '.env');

  if (!fs.existsSync(envPath)) {
    return {} as Record<string, string>;
  }

  const parsed: Record<string, string> = {};

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    if (key) {
      parsed[key] = value;
    }
  }

  return parsed;
};

const localEnv = loadLocalEnv();
const automationExerciseEmail = process.env.AUTOMATIONEXERCISE_EMAIL || localEnv.AUTOMATIONEXERCISE_EMAIL || process.env.EMAIL || localEnv.EMAIL || '';
const automationExercisePassword = process.env.AUTOMATIONEXERCISE_PASSWORD || localEnv.AUTOMATIONEXERCISE_PASSWORD || process.env.PASSWORD || localEnv.PASSWORD || '';
const trelloActionId = process.env.TRELLO_ACTION_ID || localEnv.TRELLO_ACTION_ID || process.env.TRELLO || localEnv.TRELLO || '';
const trelloActionUrl = process.env.TRELLO_ACTION_URL || localEnv.TRELLO_ACTION_URL || (trelloActionId ? `https://api.trello.com/1/actions/${trelloActionId}` : '');

export default defineConfig({
  env: {
    AUTOMATIONEXERCISE_EMAIL: automationExerciseEmail,
    AUTOMATIONEXERCISE_PASSWORD: automationExercisePassword,
    TRELLO_ACTION_URL: trelloActionUrl,
  },
  e2e: {
    baseUrl: environmentConfig.baseUrl,
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      allureWriter(on, config);
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
      return config;
    },
  },
});
