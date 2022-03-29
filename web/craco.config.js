const cracoLessPlugin = require('craco-less');
const cracoAliasPlugin = require("craco-alias");
const webpackConfigPlugin = require("./webpack.config")
const {loaderByName} = require("@craco/craco");
const path = require("path");

module.exports = {
    eslint: {
        // enable: process.env.NODE_ENV === "development",
        enable: false
    },
    plugins: [
        {
            plugin: cracoLessPlugin,
            options: {
                modifyLessRule(lessRule, context) {
                    lessRule.exclude = /\.less$/
                    return lessRule
                },
                modifyLessModuleRule(lessModuleRule, context) {
                    lessModuleRule.test = /\.less$/
                    const cssLoader = lessModuleRule.use.find(loaderByName('css-loader'))
                    cssLoader.options.modules = {
                        localIdentName: '[local]'
                    }
                    return lessModuleRule
                },
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@border-radius-base': '4px',
                            "@ctm-prefix": "ctm"
                        },
                        javascriptEnabled: true
                    },
                },
            },
        },
        {
            plugin: cracoAliasPlugin,
            options: {
                source: "tsconfig",
                baseUrl: ".",
                tsConfigPath: "./tsconfig.extend.json",
            }
        },
        {plugin: webpackConfigPlugin, options: {preText: "Will log the webpack config:"}}
    ],
};