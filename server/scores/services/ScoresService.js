class ScoresService {
    repo;

    constructor(repo) {
        this.repo = repo;
    }

    getAllScores = async () => {
        return await this.repo.getAllScores();
    }

    addScore = async (reqBody) => {
        const { title, value } = reqBody;
        return await this.repo.addScore({ title, value });
    }
}

module.exports = ScoresService;