const env = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/../config/config.json')[env];
const Sequelize = require('sequelize');

class PostgresDB {
    static init() {
        // databaseName, username, password
        // const psql = config.use_env_variable ?
        //     new Sequelize(process.env[config.use_env_variable], config) :
        //     new Sequelize(config.uri, config);

        const psql = config.uri ?
            new Sequelize(config.uri, config) :
            new Sequelize(config.database, config.username, config.password, config);

        psql.authenticate()
            .then(() => {
                console.log('Connection to postgres has been established successfully.');
            })
            .catch((err) => {
                console.error('Unable to connect to the database:', err);
            });

        const Scores = psql.define('scores',{
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            title: { type: Sequelize.STRING, allowNull: false },
            value: { type: Sequelize.INTEGER, allowNull: false },
        });

        return {
            db: psql,
            type: 'postgres',
            Scores,
        };
    }
}

module.exports = PostgresDB;

// const Sequelize = require('sequelize');
//
// class PostgresDB {
//     static init() {
//         // databaseName, username, password
//         const psql = new Sequelize('memory_game', 'postgres', 'root', {
//             host: 'localhost',
//             dialect: 'postgres',
//             define: {
//                 timestamps: false,
//             },
//         });
//
//         psql.authenticate()
//             .then(() => {
//                 console.log('Connection to postgres has been established successfully.');
//             })
//             .catch((err) => {
//                 console.error('Unable to connect to the database:', err);
//             });
//
//         const Scores = psql.define('scores',{
//             id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//             title: { type: Sequelize.STRING, allowNull: false },
//             value: { type: Sequelize.INTEGER, allowNull: false },
//         });
//
//         return {
//             db: psql,
//             type: 'postgres',
//             Scores,
//         };
//     }
// }
//
// module.exports = PostgresDB;