//download menggunakan Promise 
const download = () => {
    return new Promise((resolve, reject) => {
      const status = true; 
      setTimeout(() => {
        if (status) {
          resolve("Download Selesai"); 
        } else {
          reject("Download gagal");
        }
      }, 5000);
    });
  };
  
  // Memanggil fungsi download 
  download()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err); 
    });
  