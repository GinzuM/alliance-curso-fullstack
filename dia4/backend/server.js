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

//hello world
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Retorna todos os clientes
app.get('/clientes', async (req, res) => {
    const result = await pool.query("SELECT codigo, nome, login, email  FROM clientes")
    
    res.status(200).send(result.rows);
})

// Retorna o produto com o codigo
app.get('/clientes/:codigo', async (req, res) => {
    const result = await pool.query("SELECT codigo, nome, login, email FROM clientes WHERE codigo=$1",[req.params.codigo]);
    if (result.rowCount == 0){
        res.statusCode = 404
        res.send("404")
    }else
        res.status(200).send(result.rows);
})

//DELETA clientes com o codigo
app.delete('/clientes/:codigo', async (req, res) => {
    const result = await pool.query("DELETE FROM clientes WHERE codigo=$1",[req.params.codigo]);

    if (result.rowCount == 0){
        res.statusCode = 404
        res.send("NOK")
    }
    else{
        res.status(200).send("OK");
    }
})

// Atualiza um item do cadastro
app.post('/clientes', async (req, res) => {
    var newObj = req.body;
    //var sameCodigo = listaclientes.filter(x => x.codigo == newObj.codigo);
    //insert into clientes(codigo,nome,login, email) values (4, 'teste', 2)
    const sameCodigo = await pool.query("SELECT codigo FROM clientes WHERE codigo = $1",[newObj.codigo]);
    if (sameCodigo.rowCount > 0 ) {
            res.statusCode = 409;
            res.send("NOK");
    }else{
        const result = await pool.query("INSERT INTO clientes (codigo, nome, login, email) VALUES($1,$2,$3,$4)",
        [newObj.codigo, newObj.nome, newObj.login, newObj.email]);
        res.statusCode = 201;
        res.send(newObj);
    }
})

app.put('/clientes/:codigo', async (req, res) => {
    const resource = await pool.query("SELECT codigo, nome, login, email FROM clientes WHERE codigo = $1", [req.params.codigo]);
    var newObj = req.body;

    if (resource.rowCount == 0) {
        res.statusCode = 404
        res.send("NOK"); 
    }
    else {
        var elementoAtual = resource.rows[0]; 
        if (elementoAtual.codigo != newObj.codigo) {
            var existsNew = await pool.query("SELECT codigo, nome, login, email FROM clientes WHERE codigo = $1", [newObj.codigo]);
            if (existsNew.rowCount > 0) {
                res.statusCode = 409
                res.send("NOK");
                return;
            } 
        } 

        const updated = await pool.query("UPDATE clientes SET codigo = $1, nome = $2, login = $3, email = $4 WHERE codigo = $5 RETURNING *", [newObj.codigo, newObj.nome, newObj.login, newObj.email, req.params.codigo]);
        res.send(updated.rows[0]);
    }
})

//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

console.log("final");