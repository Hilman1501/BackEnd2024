const Student = require("../models/Student");

class StudentController{
    async index(req,res){
        //memanggil method static dengan await
        const students = await Student.all();

        //data array lebih dari 0 
        if(students.lenght > 0 ){
            const data ={
                message : "menampilkan seluruh data Student",
                data : students,
            };
            return res.status(200).json(data);
        } else{
            const data = {
                message : " student is empty"
            };
            return res.status(200).json(data);
        }
    }  

    async store(req, res) {
        //descruting object req.body
        const {nama, nim, email, jurusan}= req.body;
        
        //jika data undefined maka krim respons eror
        if(!nama || !nim || !email || !jurusan ){
            const data = {
                message : "Semua data harus di krim",
            };
            return res.status(422).json(data);
        }
        else {
            const students = await Student.create(req.body);
            const data = {
                message : " Menambahkan data students",
                data : students,
            };
            return res.status(201).json(data);
        }

    }
    async update(req,res){
        const{id}=req.params;
        //mencari id student yang ingin di update
        const students=await Student.find(id);

        if(students){
            //melakukan update data
            const students=await Student.update(id,req.body);
            const data={
                message:"mengupdate data students",
                data: students,
            };
            res.status(200).json(data);
        }
        else{
            const data={
                message : "students not found"
            };
            req.status(400).json(200);
        }
    }

    async destroy(req,res){
        const {id} = req.params;
        const students=await Student.find(id);

        if(students){
            await Student.delete(id);
            const data={
                message :" menghapus data students"
            };

            res.status(200).json(data);
        } else{
            const data = {
                message :"students not found",
            };
            res.status(400).json(data);
        }
    }

    async show(req,res){
        const {id} = req.params;
        //cari students berdasarkan id
        const students=await Student.find(id);

        if(students){
            const data = {
                message : "Menampilkan detail students",
                data : students,
            };
            res.status(200).json(data);
        }
        else{
            const data="Students not found";
        };
        res.status(400).json(data);
    }
    
}   


module.exports = new StudentController();