const { Persiapan, rebusAir, masak } = require("./Persiapan.js");

const main = () => {
  Persiapan()
    .then((res) => {
      console.log(res);
      return rebusAir();
    })
    .then((res) => {
      console.log(res);
      return masak();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};

main();
