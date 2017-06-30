var mysql = require("mysql");
var parametros = {
  host: 'LocalHost',
  user: 'root',
  password: '',
  database: 'AgendaIn6am'
};
var connection = mysql.createConnection(parametros);

module.exports = connection;
