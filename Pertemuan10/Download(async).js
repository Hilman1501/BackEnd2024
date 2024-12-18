// Fungsi download menggunakan async/await
const download = async () => {
  const status = true; 

  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (status) {
          resolve("Download Selesai");
        } else {
          reject("Download gagal");
        }
      }, 5000);
    });
    console.log(result); // Menangani hasil sukses
  } catch (err) {
    console.error(err); // Menangani error
  }
};

// Memanggil fungsi download
download();
