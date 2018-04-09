#! /usr/bin/env node

const asciidoctor = require('asciidoctor.js')();
const fs = require('fs-extra');
const path = require('path');

const assign = require('./support/assign.ts');

const configPath = path.resolve('./') + '/asciidoc.config.json';
const projectPkg = require(path.resolve('./package.json'));

const asciiDocConfigFile = fs.existsSync(configPath)? require(configPath) : {};
const asciiDocConfig = assign({
    extensions: {
        include: []
    }
}, asciiDocConfigFile);
const opts = assign({
    attributes: {
        version: projectPkg.version
    },
    safe: 'safe',
    header_footer: true
}, asciiDocConfig.opts);

const filePath = path.resolve(asciiDocConfig.source);

asciidoctor.Extensions.register(function () {
    asciiDocConfig.extensions.include.map(extension => {

        this.includeProcessor(
            require(path.resolve(`./node_modules/@asciidoctor-extender/${extension}/plugin/index.ts`))
        );
    });
});
const content = fs.readFileSync(filePath).toString();

fs.ensureFileSync(`${asciiDocConfig.target}.html`);
fs.writeFileSync(`${asciiDocConfig.target}.html`, asciidoctor.convert(content, opts));
