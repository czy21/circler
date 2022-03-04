const path = require("path")
module.exports = {
    overrideWebpackConfig: ({webpackConfig, cracoConfig, pluginOptions, context: {env, paths}}) => {
        if (pluginOptions.preText) {
            console.log(pluginOptions.preText);
        }
        // webpackConfig.entry = path.resolve(".", "src/component/index.ts")
        // webpackConfig.output.libraryTarget = "umd"
        webpackConfig.output.publicPath = process.env.REACT_APP_BASE_URL
        return webpackConfig;
    }
};