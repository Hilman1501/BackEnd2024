// import AlumniController
const AlumniController = require("../controllers/AlumniController");

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Alumni API Express");
});

// Membuat routing alumni
router.get("/alumni", AlumniController.index);
router.post("/alumni", AlumniController.store);
router.put("/alumni/:id", AlumniController.update);
router.delete("/alumni/:id", AlumniController.destroy);
router.get("/alumni/:id", AlumniController.show);
router.get("/alumni/search/:name", AlumniController.search);
router.get("/alumni/status/fresh-graduate", AlumniController.freshGraduate);
router.get("/alumni/status/employed", AlumniController.employed);
router.get("/alumni/status/unemployed", AlumniController.unemployed);

// export router
module.exports = router;
