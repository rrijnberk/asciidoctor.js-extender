const asciidoctor = require('asciidoctor.js')();
const fs = require('fs-extra');
const path = require('path');

const assign = require('./support/assign.ts');

const configPath = path.resolve('./') + '/asciidoc.config.json';
const projectPkg = require(path.resolve('./package.json'));

const asciiDocConfigFile = fs.existsSync(configPath)? require(configPath) : {};
const asciiDocConfigDefaults = {
    extensions: {
        include: []
    }
};
const asciiDocConfig = assign(asciiDocConfigDefaults, asciiDocConfigFile);


const opts = assign({
    attributes: {
        version: projectPkg.version
    },
    safe: 'safe',
    header_footer: true
}, asciiDocConfig.opts);

const filePath = path.resolve('test/test.adoc');

asciidoctor.Extensions.register(function () {
    asciiDocConfig.extensions.include.map(extension => {
        this.includeProcessor(
            require(path.resolve(`./node_modules/${extension}/plugin/index.ts`))
        );
    });
});


const content = fs.readFileSync(filePath).toString();

// console.log('content', asciidoctor.convert(content, opts));

fs.ensureFileSync('target/components.po.html');
fs.writeFileSync('target/components.po.html', asciidoctor.convert(content, opts));
