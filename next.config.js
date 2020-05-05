const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');
require("dotenv").config();

module.exports = phase => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  const env = {
    STOREFRONT_PUBLIC_KEY: (() => {
      return process.env.STOREFRONT_PUBLIC_KEY;
    })(),
    STOREFRONT_API: (() => {
      return process.env.STOREFRONT_API;
    })(),
  }

  return {
    env
  };
}