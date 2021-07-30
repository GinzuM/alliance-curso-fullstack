const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()

app.use(cors())
app.use(express.json());

const port = 3000

const pool = new Pool({
    connectionString: "postgres://postgres:Discovoador8@localhost:5432/cadastro"
});

pool.on('connect', () => {
    console.log("Base de dados conectada com sucesso")
})

//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

console.log("final");