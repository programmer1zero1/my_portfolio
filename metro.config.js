const path = require('path');
const {getDefaultConfig} = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Monorepo: watch the local workspace package (`packages/expo-responsive-window`).
config.watchFolders = [path.resolve(__dirname, 'packages')];

module.exports = config;
