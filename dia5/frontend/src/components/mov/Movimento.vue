<template>
  
</template>

<script>
import FormMovimento from "../mov/FormMovimento.vue"
export default {
  name: "Movimento",
  props: {
    movimento: {
        id: Number,
        data_mov: String,
        descricao: String,
        categoria: String,
        valor: Number
    },
    index: Number
  },
  emits: {
    removed: null,
    edited: ( { movimento }) => {
      if (movimento)
        return true;
      else { console.warn('Invalied edited event payload')}
        return false;
    }
  },

  methods: {
    excluir: function () {
      this.$emit('removed');
    },
    edit: function(movimento) {
      this.$emit('edited', movimento, this.index)
    }
  },
  components: {
    FormMovimento
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