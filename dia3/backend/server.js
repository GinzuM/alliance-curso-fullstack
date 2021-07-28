const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()

app.use(cors())
app.use(express.json());

const port = 3000

const pool = new Pool({
    connectionString: "postgres://postgres:Discovoador8@localhost:5432/loja"
});

pool.on('connect', () => {
    console.log("Base de dados conectada com sucesso")
})

//hello world
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Retorna todos os produtos
app.get('/produtos', async (req, res) => {
    const result = await pool.query("SELECT codigo, descricao, quantidade  FROM produtos")
    
    res.status(200).send(result.rows);
})

// Retorna o produto com o codigo
app.get('/produtos/:codigo', async (req, res) => {
    const result = await pool.query("SELECT codigo, descricao, quantidade FROM produtos WHERE codigo=$1",[req.params.codigo]);
    if (result.rowCount == 0){
        res.statusCode = 404
        res.send("404")
    }else
        res.status(200).send(result.rows);
})

//DELETA produtos com o codigo
app.delete('/produtos/:codigo', async (req, res) => {
    const result = await pool.query("DELETE FROM produtos WHERE codigo=$1",[req.params.codigo]);

    if (result.rowCount == 0){
        res.statusCode = 404
        res.send("NOK")
    }
    else{
        res.status(200).send("OK");
    }
})

// Atualiza um item do cadastro
app.post('/produtos', async (req, res) => {
    var newObj = req.body;
    //var sameCodigo = listaProdutos.filter(x => x.codigo == newObj.codigo);
    //insert into produtos(codigo,descricao,quantidade) values (4, 'teste', 2)
    const sameCodigo = await pool.query("SELECT codigo FROM produtos WHERE codigo = $1",[newObj.codigo]);
    if (sameCodigo.rowCount > 0 ) {
            res.statusCode = 409;
            res.send("NOK");
    }else{
        const result = await pool.query("INSERT INTO produtos (codigo, descricao, quantidade) VALUES($1,$2,$3)",
        [newObj.codigo, newObj.descricao, newObj.quantidade]);
        res.statusCode = 201;
        res.send(newObj);
    }
})

app.put('/produtos/:codigo', async (req, res) => {
    const resource = await pool.query("SELECT codigo, descricao, quantidade FROM produtos WHERE codigo = $1", [req.params.codigo]);
    var newObj = req.body;

    if (resource.rowCount == 0) {
        res.statusCode = 404
        res.send("NOK"); 
    }
    else {
        var elementoAtual = resource.rows[0]; 
        if (elementoAtual.codigo != newObj.codigo) {
            var existsNew = await pool.query("SELECT codigo, descricao, quantidade FROM produtos WHERE codigo = $1", [newObj.codigo]);
            if (result.rowCount > 0) {
                res.statusCode = 409
                res.send("NOK");
                return;
            } 
        } 

        const updated = await pool.query("UPDATE produtos SET codigo = $1, descricao = $2, quantidade = $3 WHERE codigo = $4", [newObj.codigo, newObj.descricao, newObj.quantidade, req.params.codigo]);
        res.send("OK");
    }
})

//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

console.log("final");