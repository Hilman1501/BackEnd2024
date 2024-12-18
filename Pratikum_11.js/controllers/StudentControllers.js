const studentData = require('../data/students');

class StudentController {
    // menampilkan semua siswa
    index(req, res) {
        studentData.index(req, res); 
    }

    // menambahkan siswa baru
    store(req, res) {
        studentData.store(req, res); 
    }

    // memperbarui nama siswa
    update(req, res) {
        const { id } = req.params;  
        const { name } = req.body;  
        studentData.update(req, res, id, name);
    }

    // Hapus siswa
    destroy(req, res) {
        const { id } = req.params;  
        studentData.destroy(req, res, id);
    }
}

const object = new StudentController();
module.exports = object;
