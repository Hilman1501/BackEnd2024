const db = require("../Config/database");

class Student{
   // membuat method static all
    static all(){
        //return promise sebagai solusi asynchronous
        return new Promise ((resolve,reject)=>{
        const query = "SELECT * FROM students"
        // melakukan query menggunakan method query
        //menerima 2 param query dan callback
        db.query(query, (err,results)=>{
            resolve(results);
        });
        });
    }
    static async create(data, callback) {
        //promise 1 melakukan insert data ke database
        const id = await new Promise((resolve, reject)=>{
            const sql = "INSERT INTO students SET ?";
        db.query(sql, data, (err, results) => {
            resolve(results,InsertId);
        });
    });
    //prmise 2 get data bi id
    const students= this.find(id);
    return students;
        
    }
    static find (id){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM students WHERE id =?";
            db.query(sql, id, (err, results) => {
                //descruty array
                const[students]=results;
                resolve(results);
            });
        });
    } 
    static async update(id,data){
        await new Promise((resolve, reject) => {
            const sql="update students SET? WHERE id= ?";
            db.query(sql,[data, id], (err, results)=> {
                resolve(results);
            });
         });
        //mencari data yang baru di update
        const students = await this.find(id);
        return students;
    }

    static delete(id){
        return new Promise((resolve, reject)=>{
            const sql = "DELETE FROM students WHERE id = ?";
            db.query(sql, id,(err,results)=>{
                resolve(results);
            });
        });
    }
    
}


module.exports = Student;

