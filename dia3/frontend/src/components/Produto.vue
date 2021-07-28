<template>
  <div>
    <b-card id="card-produto"
      :title="produto.descricao"
      :sub-title="produto.codigo"
    >
      <b-card-text class="bg-secondary text-light">Quantidade {{ produto.quantidade }}</b-card-text>
      <b-button class="float-right" v-b-modal="'modal-confirm-delete-'+ produto.codigo">
        <b-icon-trash> </b-icon-trash>
      </b-button>

    </b-card>
    <b-modal :id="'modal-confirm-delete-'+produto.codigo" title="Confirmação"
      ok-variant='danger' cancel-variant="success"
      ok-title='Sim' cancel-title="Não"
      v-on:ok="excluir(produto)"
      >
      <p> Tem certeza que deseja excluir o produto? </p>
    </b-modal>
    <b-form></b-form>
  </div>
</template>
  


<script>
import axios from 'axios'

export default {
    name: "Produto",
    props: {
      produto:{
        codigo: Number,
        descricao: String,
        quantidade: Number
      } 
    },
  methods: {
    excluir: async function(produto) {
      //envie o comando de excluir para o beckend
      //elimine a entrada da tela se tiver sucesso
      await axios.delete(`http://localhost:3000/produtos/${produto.codigo}`)
      //avisar q foi excluido
      this.$emit('removed');
    }
  }
}
</script>

<style scoped>

.card {
  margin-bottom: 10px;
  max-width: 320px;
}

.card-title {
  color: green;
}

.card-subtitle {
  text-align: left;
  color: red !important;

}
</style>