const express = require('express')
const connection = require('./config/connection')
const { errorHandler, notFound } = require('./shared/middelwares/error.handling');
const {authRouter} = require('./routes/auth.route')

require('dotenv').config()

const app = express();


app.use(express.json());
connection()

app.get('/', (req, res) => res.send({ status: 'Ok🤝' }));
app.use('/api/v1/auth', authRouter)

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> console.log(`server is runing on prot ${PORT}`))