const path = require('path');
const projectPkg = require(path.resolve('./package.json'));

const options = {
    attributes: {
        version: projectPkg.version
    },
    safe: 'safe',
    header_footer: true
};

module.exports = options;