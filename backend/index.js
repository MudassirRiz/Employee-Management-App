const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const EmployeeRoutes = require('./routes/EmployeeRoutes');
const PORT = process.env.PORT || 8080;


require('./model/Db');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/employees', EmployeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})