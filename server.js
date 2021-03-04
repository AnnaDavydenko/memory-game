const App = require('./server/app');
const PostgresDB = require('./server/common/PostgresDB');

const db = PostgresDB.init();

App.init(db);


