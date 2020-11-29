var sql = require("mssql")
var configSql = require('./config')

const pool = new sql.ConnectionPool(configSql)
const poolConnect = pool.connect()
const transaction = pool.transaction()

module.exports = {
    pool,
    poolConnect,
    transaction
}