<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand> Movimentos </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
          <b-button v-on:click="$bvModal.show('modal-insert')">
              <b-icon-plus></b-icon-plus>
          </b-button>
      </b-navbar-nav>
    </b-navbar>
    <b-alert v-model="mostrarErro" variant="danger" dismissible>
      Falha ao {{errorMessage.action}} - {{errorMessage.message}}
    </b-alert>
    <FormMovimento ref="formAdicionar" :movimento="newMovimento" title="Adicionar Movimento" v-on:confirmed="adicionarMovimento" idModal="modal-insert"/>
    <div>
      <b-table striped hover :items="movimentos"></b-table>
    </div>
  </div>
</template>

<script>
import FormMovimento from './FormMovimento.vue'
import axios from 'axios'

export default {
    name: 'ListaMovimentos',
    data: function() {
        return {
            movimentos: [],
            newMovimento: {
              id: '',
              data_mov: '',
              descricao: '',
              categoria: '',
              valor: ''
            },
            mostrarErro: false,
            errorMessage: {
              action: '',
              message: ''
            }
        }
    },
    components: {
        FormMovimento
    },
    methods: {
      removerMovimento: async function(index, movimento) {
        await axios.delete(`http://localhost:3000/movimentos/${movimento.id}`)
        this.movimentos.splice(index, 1)
      },
      adicionarMovimento: async function(movimento) {
        try {
          var result = await axios.post("http://localhost:3000/movimentos", movimento)
          this.movimentos.push(result.data)
        } catch (error) {
          this.mostrarErro = true;
          this.errorMessage.action = "inserir"
          this.errorMessage.message = error.response.statusText
        }
        this.$refs.FormMovimento.reset();
      },
      editarMovimento: async function(movimento, index) {
        try {
          var result = await axios.put(`http://localhost:3000/movimentos/${this.movimentos[index].id}`, movimento)
          this.movimentos[index].id = result.data.id
          this.movimentos[index].data_mov = result.data.data_mov
          this.movimentos[index].descricao = result.data.descricao
          this.movimentos[index].categoria = result.data.categoria
          this.movimentos[index].valor = result.data.valor
        } catch (error) {
            this.mostrarErro = true;
            this.errorMessage.action = "atualizar"
            this.errorMessage.message = error.response.statusText
        }
      }
    },
    async created() {
      var response = await axios.get('http://localhost:3000/movimentos')
      this.movimentos = response.data
    }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px;
  display: inline-block;
}
.navbar {
  margin-bottom: 10px;
}
</style>