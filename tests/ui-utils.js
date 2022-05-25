const path = require('path');
const fs = require('fs');
const nunjucks = require('nunjucks');
const viewsPath = path.resolve(__dirname, '..', 'src', 'views');

module.exports = {
    renderString(macro, tmpl, context) {
        const macroTmpl = fs.readFileSync(
            path.resolve(viewsPath, macro),
            'utf-8'
        );

        return nunjucks.renderString(`
            ${macroTmpl}
            ${tmpl}
        `, context)
    }
}
