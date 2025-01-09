//import mysql
const mysql = require("mysql");

//import dotenv dan jalankan metode config
require("dotenv").config();
//destructuring object ke process.env
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

//membuat koneksi database menggunakan method connection
const db = mysql.createConnection({
    host: DB_HOST,        // Gunakan variabel yang sudah diambil dari process.env
    user: DB_USERNAME,    // Gunakan variabel yang sudah diambil dari process.env
    password: DB_PASSWORD, // Gunakan variabel yang sudah diambil dari process.env
    database: DB_DATABASE // Gunakan variabel yang sudah diambil dari process.env
});

//menghubungkan ke database menggunakan connection method
//menerima parameter callback
db.connect((err) => {
    if (err) {
        console.log("Error connecting: " + err.stack);
        return;
    } else {
        console.log("Connected to database");
        return;
    }
});

module.exports = db;
