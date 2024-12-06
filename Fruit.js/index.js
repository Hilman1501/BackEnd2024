const { index, store, update, destroy } = require('./FruitController.js');

const main = () => {
    console.log("Menampilkan buah :");
    index(); // Menampilkan 
    console.log(); 

    console.log("Menambahkan buah 'Pisang':");
    store("Pisang"); // Menambah
    console.log(); 

    console.log("Mengupdate data buah 0 menjadi 'Kelapa':");
    update(0, "Kelapa"); // Mengupdate 
    console.log(); 

    console.log("Menghapus data buah 0:");
    destroy(0); // Menghapus 
    console.log(); 

};

main();