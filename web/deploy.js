let childProcess = require("child_process")
const Process = require("process");
const path = require("path")
const fs = require("fs")
const lodash = require('lodash')

const sourcePath = Process.cwd()
const outputPath = path.join(sourcePath, "build")
const sourcePackageJson = require('./package.json')
const targetPackageJsonFile = path.join(outputPath, 'package.json')

function exec_cmd(cmd) {
    childProcess.execSync(cmd, {stdio: [0, 1, 2]})
}

let targetPackageJson = lodash.merge({}, {
    "name": "frontend-framework",
    "version": sourcePackageJson.version,
    "private": false,
    "main": "lib/index.tsx"
})

exec_cmd(`rm -rf ${outputPath} && mkdir ${outputPath}`)
exec_cmd(`cp -r ${path.join(sourcePath, "src/component/")} ${path.join(outputPath, "lib/")}`)
fs.writeFileSync(targetPackageJsonFile, JSON.stringify(targetPackageJson, null, 2))
exec_cmd(`npm publish ${outputPath} -registry http://nexus.cluster.com/repository/npm-hosted/`)
