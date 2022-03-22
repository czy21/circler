const path = require("path")
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const sharePath = path.resolve(__dirname, "../share/react/src/")
module.exports = {
    overrideWebpackConfig: ({webpackConfig, cracoConfig, pluginOptions, context: {env, paths}}) => {
        if (pluginOptions.preText) {
            console.log(pluginOptions.preText);
        }
        webpackConfig.output.publicPath = process.env.REACT_APP_BASE_URL
        const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
        if (oneOfRule) {
            const tsxRule = oneOfRule.oneOf.find(
                (rule) => rule.test && rule.test.toString().includes("tsx")
            );

            if (tsxRule) {
                tsxRule.include = Array.isArray(tsxRule.include)
                    ? [...tsxRule.include, sharePath]
                    : [tsxRule.include, sharePath];
            }
        }
        const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
            ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
        );
        // webpackConfig.resolve.plugins.forEach(t => {
        //     if (t instanceof ModuleScopePlugin) {
        //         t.allowedFiles.add(sharePath);
        //     }
        // });
        webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
        // webpackConfig.resolve.modules=[...webpackConfig.resolve.modules,shareNodeModules]
        return webpackConfig;
    }
};