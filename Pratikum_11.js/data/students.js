let students = ["Mikel", "Hannah", "Jonas"];

// menampilkan semua siswa
function index(req, res) {
    res.status(200).json({
        message: "Menampilkan semua students",
        data: students
    });
}

// menambahkan siswa baru
function store(req, res) {
    const { name } = req.body;  
    students.push(name); 

    res.status(201).json({
        message: `Menambahkan data student ${name}`,
        data: students
    });
}

// mengubah nama siswa
function update(req, res, id, name) {
    id = parseInt(id);  
    if (id >= 0 && id < students.length) {
        students[id] = name;  
        res.status(200).json({
            message: `Mengedit student id ${id}, nama ${name}`,
            data: students
        });
    } else {
        res.status(404).json({ message: "Student tidak ditemukan" });
    }
}

// menghapus siswa
function destroy(req, res, id) {
    id = parseInt(id);  
    if (id >= 0 && id < students.length) {
        students.splice(id, 1);  
        res.status(200).json({
            message: `Menghapus student id ${id}`,
            data: students
        });
    } else {
        res.status(404).json({ message: "Student tidak ditemukan" });
    }
}

module.exports = { index, store, update, destroy, students };
