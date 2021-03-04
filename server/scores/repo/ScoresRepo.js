class ScoresRepo {
    db;
    name;
    model;
    constructor(db) {
        this.name = 'postgres';
        this.db = db;
        this.model = db.Scores;
    }

    getAllScores = async () => {
        try {
            return await this.model.findAll();
        } catch (err) {
            return err;
        }
    };

    addScore = async (score) => {
        try {
            return await this.model.create(score);
        } catch (err) {
            return err;
        }
    };
}

module.exports = ScoresRepo;