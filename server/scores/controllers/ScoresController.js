const { Router } = require('express')
const utils = require('../utils/utils');

class ScoresController {
    scoresService;
    router;
    app;

    constructor(scoresService, app)  {
        this.router = Router();
        this.app = app;
        this.scoresService = scoresService;
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', this.getAllScores);
        this.router.post('/add', this.addScore);
    }

    getAllScores = async (req, res) => {
        try {
            const allTodos = await this.scoresService.getAllScores();
            return utils.sendResponse(res, {
                data: allTodos,
            }, 200);
        } catch (err) {
            return utils.sendResponse(res, { err }, 400);
        }
    }

    addScore = async (req, res) => {
        try {
            const newTodo = await this.scoresService.addScore(req.body);

            return utils.sendResponse(res, { newTodo }, 200);
        } catch (err) {
            return utils.sendResponse(res, { err }, 400);
        }

    }

    getRoutes = () => this.router;
}

module.exports = ScoresController;