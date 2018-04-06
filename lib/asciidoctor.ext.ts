const asciidoctor = require('asciidoctor.js')();
const fs = require('fs-extra');
const path = require('path');

const projectPkg = require(path.resolve('./', 'package.json'));


const opts = {
    attributes: {
        version: projectPkg.version
    },
    safe: 'safe',
    header_footer: true
};

const filePath = path.resolve('test/test.adoc');



asciidoctor.Extensions.register(function () {
    this.includeProcessor(markdownInclusionExtension);
});


const content = fs.readFileSync(filePath).toString();

// console.log('content', asciidoctor.convert(content, opts));

fs.ensureFileSync('target/components.po.html');
fs.writeFileSync('target/components.po.html', asciidoctor.convert(content, opts));
