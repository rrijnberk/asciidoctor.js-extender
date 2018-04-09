# asciidoctor.js-extender
The asciidoctor.js extender is a library for extending standard asciidoc with custom
built plugins. It aims to be a platform which eases extension creation and inclusion
for asciidoctor.js. 

If you wish to [submit a bug](#registering-issues), [contribute](#contributing) or 
[request a feature](#requesting-new-features) please follow the guides at the end of this document.

##installation
To include the library in your project run the following command:
```
npm install -S @asciidoctor-extender/asciidoctor.js-extender
```

## Configuring the plugin
```json
{
  "extensions": {
    "include": [
      "@asciidoctor-extender/adoc-ext-include-markdown",
      "@asciidoctor-extender/adoc-ext-include-scss"
    ]
  },
  "source": "test/test.adoc",
  "target": "target/test"
}
```

**Base attributes**

| Name | Description |
|:---- |:------------|
| source | The source file for the documentation |
| target | The target file name (without extension) to write |
| extensions | The root for all extensions |

**Extension attributes**

| Name | Description |
|:---- |:----------- |
| include | A list of [include](#for-file-inclusion) extensions |


## Creating an extension
Follow these guides for creating extensions. A base requirement for all extensions is that the package name starts with 
**@asciidoctor-extender/** and that the _**main**_ entry point is set. If the _**main**_ entry point is not set the 
library falls back to **./plugin/index.ts**.
 

### For file inclusion
Include plugins handle file parsing based on the result of the **handles** callback which gets the **file** target 
(path) as a parameter. The processing of the file content is done by the **process** callback which gets the
* **document** parameter; which is a reference to the document it's handling,
* **reader** parameter; which is the document reader
* **target** parameter; which is a file reference to the targeted file.
* **attributes** parameter; which is an object containing the attributes as defined by the include declaration.

#### A sample include plugin (for markdown)
```javascript
function isMarkdownHandler(target) {
    return target.endsWith('.md');
}

function markdownProcessor(doc, reader, target, attrs) {
    reader.pushInclude('This is where your markdown should be!', target, target, 1, attrs);
    return reader;
}

/**
 * Extension for the handling of markdown files. Converts markdown to AsciiDoc.
 */
function markdownInclusionExtension() {
    this.handles(isMarkdownHandler);
    this.process(markdownProcessor);
}

module.exports = markdownInclusionExtension;
```

This include extension will replace all include declarations referring to *.md files to the string value "This is where 
your markdown should be!". 

# Registering issues
Should something be awry please feel free to register a bug by creating an issue labeled "bug" with a clear description 
of what fails, what is expected and steps to reproduce the error.


# Contributing
To contribute to this library you can fork the library, implement the feature and create a pull request. Then create an 
issue labeled "Contribution" with a clear description of the feature and a reference to the pull request.

# Requesting new features
In order to request a new feature please open a new issue labeled "Feature request" and a clear description of
the functionality that is requested.

