const db = require("../Config/database");

class Student{
   // membuat method static all
    static all(callback){
        const query = "SELECT * from students";

        // melakukan query menggunakan method query
        //menerima 2 param query dan callback
        db.query(query, (err,results)=>{
            callback (results);
        });
    }
    static create(data, callback) {
        const query = "INSERT INTO students (nama, nim, email, jurusan) VALUES (?, ?, ?, ?)";
        db.query(query, [data.nama, data.nim, data.email, data.jurusan], (err, results) => {
            if (err) {
                console.error("Error query INSERT:", err);
            }
            callback(err, results);
        });
    }
    
}


module.exports = Student;

