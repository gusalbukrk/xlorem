import config from '../../jest.config.js'; // eslint-disable-line import/extensions

config.projects[0].globals['ts-jest'].tsconfig = '../../tsconfig.jest.json';

export default config;
