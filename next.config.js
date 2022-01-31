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
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
