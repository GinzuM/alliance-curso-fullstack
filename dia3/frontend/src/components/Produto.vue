<template>
  <div id="card-produto">
      <h2 id="descricao">{{ produto.descricao }}</h2>
      <div>
        <span id="lbl-codigo"> Código: {{ produto.codigo }}</span>
        <span id="lbl-quantidade"> Quantidade: {{ produto.quantidade }}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: "Produto",
    props: {
      produto:{
        codigo: Number,
        descricao: String,
        quantidade: Number
      } 
    }
}
</script>

<style scoped>

div#card-produto {
  border: 1px solid black;
  margin: 10px;
}

span {
  margin-right: 10px;

}

h2#descricao {
  color: blue;
}

span#lbl-codigo{
  color: red;

}

span#lbl-quantidade {
  color: indigo;

}

</style>