const express = require('express');
const studentRoutes = require('./routes/api');

const app = express();

app.use(express.json());  // middleware untuk parsing JSON request body
app.use('/api', studentRoutes);

app.listen(3000, () => console.log('Server listening on port 3000'));
