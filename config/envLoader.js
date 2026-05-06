import dev from './dev.env.js';
import prod from './prod.env.js';
import stage from './stage.env.js';   

const env = process.env.TEST_ENV || 'dev';

const envMap = {
  stage,
  dev,
  prod
};

export default envMap[env];
