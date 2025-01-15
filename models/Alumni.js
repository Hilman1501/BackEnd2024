// Import konfigurasi database
const db = require("../config/database");

// Membuat class Alumni untuk mengelola data alumni
class Alumni {

  // Mengambil semua data alumni
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni";
      db.query(sql, (err, results) => {
        if (err) reject(err); // Jika ada error, tangani segera
        resolve(results); // mengembalikan semua data alumni
      });
    });
  }

  // Menambahkan data alumni baru
  static async create(data) {
    // Simpan data alumni baru dan dapatkan ID-nya
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO alumni SET ?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err); // Tangani error jika terjadi masalah
        resolve(results.insertId); // mengembalikan ID alumni yang baru dimasukkan
      });
    });

    // Ambil data alumni yang baru ditambahkan berdasarkan ID-nya
    const alumni = await this.find(id);
    return alumni; // mengembalikan data alumni yang baru dibuat
  }

  // Memperbarui data alumni berdasarkan ID
  static async update(id, data) {
    // Lakukan update pada data alumni dengan ID tertentu
    await new Promise((resolve, reject) => {
      const sql = "UPDATE alumni SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) reject(err); // Tangani error jika terjadi kesalahan
        resolve(results); // mengembalikan hasil setelah diperbarui
      });
    });

    // Ambil data alumni yang sudah diperbarui
    const alumni = await this.find(id);
    return alumni; // mengembalikan data alumni yang diperbarui
  }

  // Menghapus data alumni berdasarkan ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(err); // Tangani error jika ada masalah
        resolve(results); // mengembalikan hasil penghapusan data alumni
      });
    });
  }

  // Mencari alumni berdasarkan ID
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(err); // Tangani error jika query gagal
        const [alumni] = results; // Ambil data alumni pertama dari hasil query
        resolve(alumni); // mengembalikan data alumni yang ditemukan
      });
    });
  }

  // Mencari alumni berdasarkan nama
  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE name LIKE ?";
      db.query(sql, [`%${name}%`], (err, results) => {
        if (err) reject(err); // Tangani error jika terjadi masalah
        resolve(results); // mengembalikan daftar alumni yang nama-nya cocok
      });
    });
  }

  // Mencari alumni berdasarkan status (misalnya: fresh-graduate, employed)
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE status LIKE ?";
      db.query(sql, [`%${status}%`], (err, results) => {
        if (err) reject(err); // Tangani error jika query gagal
        resolve(results); // mengembalikan data alumni yang sesuai dengan status
      });
    });
  }

  // Menghitung jumlah alumni berdasarkan status
  static countByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) AS total FROM alumni WHERE status LIKE ?";
      db.query(sql, [`%${status}%`], (err, results) => {
        if (err) reject(err); // Tangani error jika terjadi kesalahan
        resolve(results[0].total); // mengembalikan jumlah alumni dengan status yang dicari
      });
    });
  }
   
}

// Mengekspor class Alumni agar dapat digunakan di file lain
module.exports = Alumni;
