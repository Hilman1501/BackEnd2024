
const showDownload = (result) => {
  console.log('Download selesai');
  console.log('Hasil Download: ' + result);
};

// Fungsi untuk download file menggunakan Promise
const download = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const status = true;
      if (status) {
        const result = 'windows-10.exe';
        resolve(result);
      } else {
        reject('Download gagal');
      }
    }, 3000);
  });
};


download()
  .then((result) => {
    showDownload(result);
  })
  .catch((error) => {
    console.error(error);
  });
