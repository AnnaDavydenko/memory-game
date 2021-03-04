const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require ('express');
const port = process.env.PORT || 3001;

const ScoresRepo = require("./scores/repo/ScoresRepo");
const ScoresController = require('./scores/controllers/ScoresController');
const ScoresService = require('./scores/services/ScoresService');

class App {

    static init(db) {

        const app = express();
        app.use(cors({
            origin: '*'
        }));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        const scoresRepo = new ScoresRepo(db);
        const scoresService = new ScoresService(scoresRepo);
        const scoresController = new ScoresController(scoresService, app);

        app.use('/api/scores', scoresController.getRoutes());
        app.use(express.static('client/build'));

        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });

        return app.listen(port, function() {
            console.log('Runnning on ' + `http://localhost:${port}/`);
        });
    }
}

module.exports = App;
