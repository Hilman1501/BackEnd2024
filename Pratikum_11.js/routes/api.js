const express = require('express');
const router = express.Router();
const StudentControllers = require('../controllers/StudentControllers');


router.get('/', (req, res) => {
    res.send("Hello Express");
});

router.get('/students', StudentControllers.index);
router.post('/students', StudentControllers.store);
router.put('/students/:id', StudentControllers.update);
router.delete('/students/:id', StudentControllers.destroy);

module.exports = router;
