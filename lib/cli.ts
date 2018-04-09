#! /usr/bin/env node

const asciidoctor = require('asciidoctor.js')();
const fs = require('fs-extra');
const path = require('path');

const assign = require('./support/assign.ts');

const defaultOptions = require('./defaults/options.ts');
const defaultConfig = require('./defaults/config.ts');

const configPath = path.resolve('./') + '/asciidoc.config.json';
const asciiDocConfigFile = fs.existsSync(configPath)? require(configPath) : {};

const asciiDocConfig = assign(defaultConfig, asciiDocConfigFile);
const opts = assign(defaultOptions, asciiDocConfig.opts);

const filePath = path.resolve(asciiDocConfig.source);

asciidoctor.Extensions.register(function () {
    asciiDocConfig.extensions.include.map(extension => {
        const pluginPath =`./node_modules/${extension}`,
            mainEntry = require(path.resolve(`${pluginPath}/package.json`)).main,
            pluginEntry = `./node_modules/${extension}/${mainEntry || '/plugin/index.ts'}`;
        this.includeProcessor(require(path.resolve(pluginEntry)));
    });
});



const content = fs.readFileSync(filePath).toString();

fs.ensureFileSync(`${asciiDocConfig.target}.html`);
fs.writeFileSync(`${asciiDocConfig.target}.html`, asciidoctor.convert(content, opts));
