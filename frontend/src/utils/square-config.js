/**
 * Square Payment Configuration
 * @constant
 * @type {Object}
 * @property {Object} sandbox - Sandbox environment config
 * @property {string} sandbox.applicationId - Sandbox App ID
 * @property {string} sandbox.locationId - Sandbox Location ID
 * @property {Object} production - Production environment config
 * @property {string} production.applicationId - Production App ID
 * @property {string} production.locationId - Production Location ID
 */

const validateConfig = (config, env) => {
  if (!config.applicationId || !config.locationId) {
    console.error(`Missing Square configuration for ${env} environment`);
    return false;
  }
  return true;
};

export const SQUARE_CONFIG = {
  sandbox: {
    applicationId: process.env.REACT_APP_SQ_APPLICATION_ID,
    locationId: process.env.REACT_APP_SQ_LOCATION_ID
  },
  production: {
    applicationId: process.env.REACT_APP_SQ_PRODUCTION_APP_ID,
    locationId: process.env.REACT_APP_SQ_PRODUCTION_LOCATION_ID
  }
};

// Validate current environment config
const currentEnv = process.env.NODE_ENV;
const currentConfig = SQUARE_CONFIG[currentEnv === 'production' ? 'production' : 'sandbox'];
validateConfig(currentConfig, currentEnv);

export default SQUARE_CONFIG;
