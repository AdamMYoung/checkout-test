const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    distDir: 'build',
};

const moduleExports = {
    nextConfig,
};

const sentryWebpackPluginOptions = {
    silent: true,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
