const mysql = require('mysql')

const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "database_transmisi_kendaraan"
})

connect.connect(function(error){
    if(error){
        console.log(error)
    } else {
        console.log("Connection To Database Success!")
    }
})

module.exports = connect;