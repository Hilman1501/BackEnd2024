const Student = require("../models/Student");

class StudentController{
    index(req,res){
        //memanggil method static
        Student.all(function(students){
        const data ={
            message : "menampilkan seluruh data Student",
            data : students,
        };
        res.json(data);
        });
    }  

    store(req, res) {
        const { nama, nim, email, jurusan } = req.body;
    
        // Validasi dan simpan data
        if (!nama || !nim || !email || !jurusan) 
            return res.status(400).json({ message: "Gagal menambahkan data" });
        //menyimpan insert data ke dalam database
        Student.create({ nama, nim, email, jurusan }, (err, results) => {
            res.status(201).json({
                message: "Data student berhasil ditambahkan",
                data: { id: results.insertId, nama, nim, email, jurusan },
            });
        });
    }
    
}   


module.exports = new StudentController();