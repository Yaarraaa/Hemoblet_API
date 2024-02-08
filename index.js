const express = require('express')
const connection = require('./config/connection')
require('dotenv').config()

const app = express();


app.use(express.json());
connection()

app.get('/', (req, res) => res.send({ status: 'Ok🤝' }));

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> console.log(`server is runing in ${process.env.NODE_ENV} mode on prot ${PORT}`))