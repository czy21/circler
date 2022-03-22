const cracoLessPlugin = require('craco-less');
const cracoAliasPlugin = require("craco-alias");
const webpackConfigPlugin = require("./webpack.config")
const {loaderByName} = require("@craco/craco");

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
                    // You have to exclude these file suffixes first,
                    // if you want to modify the less module's suffix
                    lessRule.exclude = /\.m\.less$/
                    return lessRule
                },
                modifyLessModuleRule(lessModuleRule, context) {
                    // Configure the file suffix
                    lessModuleRule.test = /\.m\.less$/

                    // Configure the generated local ident name.
                    const cssLoader = lessModuleRule.use.find(loaderByName('css-loader'))
                    cssLoader.options.modules = {
                        localIdentName: '[local]_[hash:base64:5]'
                    }

                    return lessModuleRule
                },
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@border-radius-base': '4px'
                        },
                        javascriptEnabled: true,
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