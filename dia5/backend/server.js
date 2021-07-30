const express = require('express')
const cors = require('cors')
const { Pool , types} = require('pg')

const app = express()

app.use(cors())
app.use(express.json());

const port = 3000

types.setTypeParser(1082, function(value) {
  return value;
});

const pool = new Pool({
    connectionString: "postgres://postgres:Discovoador8@localhost:5432/movimentacao"
});

pool.on('connect', () => {
    console.log("Base de dados conectada com sucesso")
})



//hello world
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Retorna todos os movimentos
app.get('/movimentos', async (req, res) => {
  const result = await pool.query("SELECT * FROM movimentos")
  
  res.status(200).send(result.rows);
})

// Retorna o produto com o id
app.get('/movimentos/:id', async (req, res) => {
  const result = await pool.query("SELECT * FROM movimentos WHERE id=$1",[req.params.id]);
  if (result.rowCount == 0){
      res.statusCode = 404
      res.send("404")
  }else
      res.status(200).send(result.rows);
})

//DELETA movimentos com o id
app.delete('/movimentos/:id', async (req, res) => {
  const result = await pool.query("DELETE FROM movimentos WHERE id=$1",[req.params.id]);

  if (result.rowCount == 0){
      res.statusCode = 404
      res.send("NOK")
  }
  else{
      res.status(200).send("OK");
  }
})

// Atualiza um item do cadastro
app.post('/movimentos', async (req, res) => {
  var newObj = req.body;
  const result = await pool.query("INSERT INTO movimentos (data_mov, descricao, categoria, valor) VALUES($1,$2,$3,$4)",
  [newObj.data_mov, newObj.descricao, newObj.categoria, newObj.valor]);
  res.statusCode = 201;
  res.send(newObj);
})

app.put('/movimentos/:id', async (req, res) => {
  const resource = await pool.query("SELECT id, data_mov, descricao, categoria, valor FROM movimentos WHERE id = $1", [req.params.id]);
  var newObj = req.body;
  if (resource.rowCount == 0) {
    res.statusCode = 404
    res.send("NOK"); 
  }else{
    const updated = await pool.query("UPDATE movimentos SET data_mov = $1, descricao = $2, categoria = $3, valor = $4 WHERE id = $5 RETURNING *", [newObj.data_mov, newObj.descricao, newObj.categoria, newObj.valor, req.params.id]);
    res.send(updated.rows[0]);
}
  
})

//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

console.log("final");