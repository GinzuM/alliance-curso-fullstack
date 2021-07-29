<template>
  <div>
    <b-card id="card-cliente" class="text-center"
      :title= "'CLIENTE : ' + cliente.codigo.toString() "
      >
      <b-card-text id="nome" class="bg-secondary text-light">Nome : {{cliente.nome}}</b-card-text>
      <b-card-text id="login" class="bg-secondary text-light">Login : {{cliente.login}}</b-card-text>
      <b-card-text id="email" class="bg-secondary text-light">E-mail : {{cliente.email}}</b-card-text>

      <b-button class="float-right" v-b-modal="'modal-confirm-delete-'+cliente.codigo">
        <b-icon-trash></b-icon-trash>
      </b-button>

      <b-button class="float-right" v-b-modal="'modal-confirm-edit-'+cliente.codigo">
        <b-icon-pen></b-icon-pen>
      </b-button>
    </b-card>
    <b-modal :id="'modal-confirm-delete-'+cliente.codigo" title="Confirmação" 
      ok-variant='danger' cancel-variant="success"
      ok-title='Sim' cancel-title='Não'
      v-on:ok="excluir()"
      >
      <p>Tem certeza que deseja excluir o cliente</p>
    </b-modal>
    <FormCliente :cliente="cliente" title="Editar cliente" v-on:confirmed="edit"/>
  </div>
</template>

<script>
import FormCliente from "./FormCliente.vue"
export default {
  name: "Cliente",
  props: {
    cliente: {
        codigo: Number,
        nome: String,
        login: String,
        email: String
    },
    index: Number
  },
  emits: {
    removed: null,
    edited: ( { cliente }) => {
      if (cliente)
        return true;
      else { console.warn('Invalied edited event payload')}
        return false;
    }
  },

  methods: {
    excluir: function () {
      // avisar que eu fui excluido
      this.$emit('removed');
    },
    edit: function(cliente) {
      this.$emit('edited', cliente, this.index)
    }
  },
  components: {
    FormCliente
  }
}
</script>

<style scoped>

.card {
    margin-top: 10px;
    margin-bottom: 10px;
    max-width: 400px;
    height: 240px;
}

.card-title {
  color: black;
  font-family: Cambria;
  font-size: 30px
}



.btn {
  margin: 2px;
  color: black;
  background: #7bada6;
  
}
</style>