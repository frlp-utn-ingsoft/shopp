const path = require('path');

const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const nunjucks = require('./utils/nunjucks.js');
const env = require('./utils/env.js');

// Modelos
const models = require('./models/index.js');

const detectPort = require('detect-port');

// Rutas
const viewRouter = require('./views/index.js');

const inTest = env.test;
const views = path.resolve(__dirname, '.', 'views/templates');

async function startServer(port = process.env.PORT) {
    port = port || (await detectPort(3000));
    await models.createTables();

    const app = express();

    if (!inTest) {
        app.use(morgan('dev'));
    }

    app.use(bodyParser.json());
    app.use(express.static(views));
    app.set('views', views);
    app.set('view engine', 'html');

    nunjucks.init({
        express: app,
        viewsPath: views,
    });

    // rutas de la vista
    app.use('/', viewRouter);

    return new Promise(function (resolve) {
        const server = app.listen(port, function () {
            if (!inTest) {
                console.log(`Server started on http://localhost:${port}`);
            }

            const originalClose = server.close.bind(server);
            server.close = async () => {
                return new Promise(resolveClose => {
                    originalClose(resolveClose);
                });
            };

            resolve(server);
        });
    });
}

if (require.main === module) {
    startServer();
}

module.exports = {
    start: startServer,
};
