const path = require('path');
const fs = require('fs/promises');
const express = require('express');
const router = express.Router();

const lhPath = path.resolve(__dirname, '..', '.lighthouseci');

router.get('/', async (req, res) => {
    const files = await fs.readdir(lhPath);
    const runs = files
        .reverse()
        .filter((file) => file.endsWith('.html'))
        .map((file) => {
            const withoutExt = file.replace('.html', '');
            const [_, datestr] = withoutExt.split('-');
            const date = new Date(+datestr);

            return {
                link: file,
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString(),
            };
        });

    res.send(`
        <h1>Corridas de Lighthouse</h1>
        <ul>
            ${runs.map(
                (f) =>
                    `<li><a href="/lh/${f.link}">${f.date} ${f.time}</a></li>`
            )}
        </ul>
    `);
});

router.get('/:file', async (req, res) => {
    const requestFile = req.params.file;
    const files = await fs.readdir(lhPath);
    const htmlFiles = files.filter((file) => file.endsWith('.html'));

    if (htmlFiles.includes(requestFile)) {
        const content = await fs.readFile(
            path.resolve(lhPath, requestFile),
            'utf8'
        );
        res.send(content);
    } else {
        res.status(404).send();
    }
});

module.exports = router;
