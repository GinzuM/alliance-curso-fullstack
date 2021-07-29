<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand> Produtos </b-navbar-brand>
            <b-navbar-nav class="ml-auto">
            <b-button v-b-modal.teste>
                <b-icon-plus></b-icon-plus>
            </b-button>
            </b-navbar-nav>
            <b-modal id="teste" title="Inserir novo produto"
                ok-variant='success' cancel-variant="danger"
                ok-title='Sim' cancel-title="Não"
                v-on:ok="objetoProduto(codigoNovo, descricaoNovo, quantidadeNovo), adicionarProduto(novoProduto), created()"
                
            >

            <b-form-group id="fieldset-1" label="Codigo"
                label-for="input-1" :state="state">
                <b-form-input id="input-1" type="Number" placeholder="CODIGO TESTE" v-model="codigoNovo" :state="state" ></b-form-input>
            </b-form-group>

            <b-form-group id="fieldset-2"  label="Descricao"
                label-for="input-2" :state="state">
                <b-form-input id="input-2" type="string" placeholder="CODIGO TESTE" v-model="descricaoNovo" :state="state" ></b-form-input>
            </b-form-group>

            <b-form-group id="fieldset-3" label="Quantidade"
                label-for="input-3" :state="state">
                <b-form-input id="input-3" type="number" placeholder="CODIGO TESTE" v-model="quantidadeNovo" :state="state" ></b-form-input>
            </b-form-group>

            </b-modal>  
        </b-navbar>
        
        <ul id="ListaProdutos">
            <li v-for="produto, index in produtos" v-bind:key="produto.codigo">
                <Produto v-bind:produto="produto" v-on:removed="removerProduto(index)"/>
            </li>
        </ul>
    </div> 
</template>

<script>
import Produto from './Produto.vue'

import axios from 'axios'

export default {
    name: 'ListaProdutos',
    data: function(){
        return {
            produtos: [],
            novoProduto: {codigo: Number, descricao: String, quantidade:Number}
        }

    },
    components: {
        Produto
    },
    methods: {
        removerProduto: function(index) {
            this.produtos.splice(index, 1)
        },
        objetoProduto: function(x,y,z){
            this.novoProduto.codigo = x
            this.novoProduto.descricao = y
            this.novoProduto.quantidade = z
        },
        adicionarProduto: async function(novoProduto){
            await axios.post('http://localhost:3000/produtos', novoProduto)
            var response = await axios.get('http://localhost:3000/produtos')
            this.produtos = response.data
        }
    },

    async created() {
        var response = await axios.get('http://localhost:3000/produtos')
        this.produtos = response.data
    },
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