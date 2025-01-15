// Import model Alumni untuk mengelola data alumni
const Alumni = require("../models/Alumni");

// Membuat class AlumniController yang berisi berbagai metode untuk mengelola alumni
class AlumniController {

  // Fungsi untuk mengambil semua data alumni
  async index(req, res) {
    const alumni = await Alumni.all();

    // Cek jika data alumni kosong, kirim respons error
    if (!alumni || alumni.length === 0) {
      return res.status(404).json({
        message: "Data kosong",
        status: 200,
      });
    }

    // Jika ada data alumni, kirim respons dengan data yang ditemukan
    const data = {
      message: "Data berhasil diambil",
      data: alumni,
      status: 200,
    };

    res.json(data); // Kirim data sebagai JSON
  }

  // Fungsi untuk menambahkan data alumni baru
  async store(req, res) {
    const {
      name, phone, address, graduation_year, status, company_name, position,
    } = req.body;

    // Validasi apakah semua field sudah diisi
    if (
      !name || !phone || !address || !graduation_year || !status || !company_name || !position
    ) {
      return res.status(422).json({
        message: "Semua field harus diisi dengan benar",
        status: 422,
      });
    }

    // Proses penyimpanan data alumni baru
    const newAlumni = await Alumni.create({
      name, phone, address, graduation_year, status, company_name, position,
    });

    // Jika berhasil, kirimkan respons dengan data alumni yang baru ditambahkan
    return res.status(201).json({
      message: "Data Telah ditambahkan",
      data: newAlumni,
      status: 201,
    });
  }

  // Fungsi untuk memperbarui data alumni berdasarkan ID
  async update(req, res) {
    const { id } = req.params;

    // Mencari data alumni berdasarkan ID
    const alumni = await Alumni.find(id);

    if (!alumni) {
      // Jika alumni tidak ditemukan, kirim respons error
      return res.status(404).json({
        message: "Data tidak ditemukan",
        status: 404,
      });
    }

    // Proses pembaruan data alumni
    const updatedAlumni = await Alumni.update(id, req.body);

    // Jika berhasil, kirimkan respons dengan data alumni yang diperbarui
    return res.status(200).json({
      message: "Data Telah diperbarui",
      data: updatedAlumni,
      status: 200,
    });
  }

  // Fungsi untuk menghapus data alumni berdasarkan ID
  async destroy(req, res) {
    const { id } = req.params;

    // Mencari alumni berdasarkan ID
    const alumni = await Alumni.find(id);

    if (!alumni) {
      // Jika alumni tidak ditemukan, kirim respons error
      return res.status(404).json({
        message: "Data tidak ditemukan",
        status: 404,
      });
    }

    // Hapus data alumni
    await Alumni.delete(id);

    // Jika berhasil, kirimkan respons penghapusan berhasil
    return res.status(200).json({
      message: "Data Telah dihapus",
      status: 200,
    });
  }

  // Fungsi untuk mengambil data alumni berdasarkan ID
  async show(req, res) {
    const { id } = req.params;

    // Mencari alumni berdasarkan ID
    const alumni = await Alumni.find(id);

    if (!alumni) {
      // Jika alumni tidak ditemukan, kirim respons error
      return res.status(404).json({
        message: "Data tidak ditemukan",
        status: 404,
      });
    }

    // Jika alumni ditemukan, kirimkan data alumni tersebut
    return res.status(200).json({
      message: "Detail Data Alumni",
      data: alumni,
      status: 200,
    });
  }

  // Fungsi untuk mencari alumni berdasarkan nama
  async search(req, res) {
    const { name } = req.params;

    // Mencari alumni berdasarkan nama
    const alumni = await Alumni.search(name);

    if (!alumni) {
      // Jika tidak ada alumni yang ditemukan, kirim respons error
      return res.status(404).json({
        message: "Data tidak ditemukan",
        status: 404,
      });
    }

    // Jika data alumni ditemukan, kirimkan data alumni
    return res.status(200).json({
      message: "Data Alumni yang Dicari",
      data: alumni,
      status: 200,
    });
  }

  // Fungsi untuk mengambil data alumni dengan status 'fresh-graduate'
  async freshGraduate(req, res) {
    const status = "fresh-graduate";

    // Mencari alumni berdasarkan status
    const alumni = await Alumni.findByStatus(status);

    if (!alumni) {
      // Jika tidak ada alumni dengan status ini, kirim respons error
      return res.status(404).json({
        message: "Data tidak ditemukan",
        status: 404,
      });
    }

    // Hitung total alumni dengan status 'fresh-graduate'
    const totalAlumni = await Alumni.countByStatus(status);

    // Kirimkan data alumni yang sesuai dengan status dan jumlah total alumni
    return res.status(200).json({
      message: "Data Alumni Fresh Graduate",
      data: alumni,
      status: 200,
      total: totalAlumni
    });
  }

  // Fungsi untuk mengambil data alumni yang sudah bekerja
  async employed(req, res) {
    const status = "employed";

    // Mencari alumni dengan status 'employed'
    const alumni = await Alumni.findByStatus(status);

    if (!alumni) {
      // Jika tidak ada alumni dengan status ini, kirim respons error
      return res.status(404).json({
        message: "Data tidak ditemukan",
        status: 404,
      });
    }

    // Hitung total alumni yang sudah bekerja
    const totalAlumni = await Alumni.countByStatus(status);

    // Kirimkan data alumni dan jumlah total alumni yang bekerja
    return res.status(200).json({
      message: "Data Alumni yang Sudah Bekerja",
      data: alumni,
      status: 200,
      total: totalAlumni
    });
  }

  // Fungsi untuk mengambil data alumni yang belum bekerja
  async unemployed(req, res) {
    const status = "unemployed";

    // Mencari alumni dengan status 'unemployed'
    const alumni = await Alumni.findByStatus(status);

    if (!alumni) {
      // Jika tidak ada alumni dengan status ini, kirim respons error
      return res.status(404).json({
        message: "Data tidak ditemukan",
        status: 404,
      });
    }

    // Hitung total alumni yang belum bekerja
    const totalAlumni = await Alumni.countByStatus(status);

    // Kirimkan data alumni dan jumlah total alumni yang belum bekerja
    return res.status(200).json({
      message: "Data Alumni yang Belum Bekerja",
      data: alumni,
      status: 200,
      total: totalAlumni
    });
  }
}

// Membuat instance dari AlumniController
const object = new AlumniController();

// Mengekspor instance AlumniController agar bisa digunakan di file lain
module.exports = object;
