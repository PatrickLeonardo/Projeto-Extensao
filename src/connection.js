import mysql from 'mysql2';
import config from '../config/config.js';

const developmentDB = config.development;

const connection = mysql.createConnection({
    host:     developmentDB.host,
    user:     developmentDB.user,
    password: developmentDB.password,
    database: developmentDB.database,
    port:     developmentDB.port
});

connection.connect((err) => {
    if(err) {
        console.error(err);
    } else {
        console.log("Banco de Dados Conectado!");
    }
});

export default connection;
