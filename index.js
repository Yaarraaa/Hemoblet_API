const express = require('express')

const app = express();

app.get('/', (req, res) => res.send({ status: 'Ok🤝' }));


app.listen(3000, ()=> console.log(`app runing on prot 3000`))