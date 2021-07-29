<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>Clientes</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-button v-on:click="$bvModal.show('modal-insert')">
          <b-icon-plus></b-icon-plus>
        </b-button>
      </b-navbar-nav>
    </b-navbar>
    <b-alert v-model="mostrarErro" variant="danger" dismissible>
      Falha ao {{errorMessage.action}} - {{errorMessage.message}}
    </b-alert>
    <FormCliente ref="formAdicionar" :cliente="newcliente" title="Adicionar Cliente" v-on:confirmed="adicionarCliente" idModal="modal-insert"/>
    <ul id="listaClientes">
        <li v-for="cliente, index in clientes" v-bind:key="cliente.codigo">
            <cliente v-bind:cliente="cliente" :index="index" v-on:removed="removerCliente(index, cliente)" v-on:edited="editarCliente"/>
        </li>
    </ul>
  </div>
</template>

<script>
import Cliente from './Cliente.vue'
import FormCliente from './FormCliente.vue'
import axios from 'axios'
export default {
    name: 'ListaClientes',
    data: function() {
        return {
            clientes: [],
            newCliente: {
              codigo: '',
              nome: '',
              login: '',
              email: ''
            },
            mostrarErro: false,
            errorMessage: {
              action: '',
              message: ''
            }
        }
    },
    components: {
        Cliente,
        FormCliente
    },
    methods: {
      removerCliente: async function(index, cliente) {
        await axios.delete(`http://localhost:3000/clientes/${cliente.codigo}`)
        this.clientes.splice(index, 1)
      },
      adicionarCliente: async function(cliente) {
        try {
          var result = await axios.post("http://localhost:3000/clientes", cliente)
          this.clientes.push(result.data)
        } catch (error) {
          this.mostrarErro = true;
          this.errorMessage.action = "inserir"
          this.errorMessage.message = error.response.statusText
        }
        this.$refs.formAdicionar.reset();
      },
      editarCliente: async function(cliente, index) {
        try {
          var result = await axios.put(`http://localhost:3000/clientes/${this.clientes[index].codigo}`, cliente)
          this.clientes[index].codigo = result.data.codigo
          this.clientes[index].nome = result.data.nome
          this.clientes[index].login = result.data.login
           this.clientes[index].login = result.data.email
        } catch (error) {
            this.mostrarErro = true;
            this.errorMessage.action = "atualizar"
            this.errorMessage.message = error.response.statusText
        }
      }
    },
    async created() {
      var response = await axios.get('http://localhost:3000/clientes')
      this.clientes = response.data
    }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
</style>