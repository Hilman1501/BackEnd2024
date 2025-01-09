const express = require('express')

//inport router
const router = require("./Router/api")
const app = express()
const port = 3000

//menggunakan midleware
app.use(express.json());
app.use(express.urlencoded());

//menggunakan routing dari router
app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${3000}`)
})