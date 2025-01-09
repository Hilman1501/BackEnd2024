//import Studentcontroller
const StudentController=require("../Controller/StudentController")

//inport exppress
const express = require('express')
//membuat object router
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Aku nggk tau apa yang terjadi')
  })
//Router untuk Student
router.get('/students', StudentController.index);
router.post('/students', StudentController.store);
//router.put('/students/:id', StudentController.update);
//router.delete('/students/:id', StudentController.destroy);

//export router
module.exports = router;