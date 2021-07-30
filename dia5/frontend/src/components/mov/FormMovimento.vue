<template>
    <b-modal :id="idModal ? idModal : ('modal-confirm-edit-'+movimento.id)" :title="title" v-on:ok="ok()" v-on:cancel="reset()">
              
        <b-form>
            <b-form-group
            id="input-data_mov"
            label-for="data_mov"
            description="Data"
            ></b-form-group>

            <b-form-input 
            id="data_mov"
            v-model="movimentoInterno.data_mov"
            type="date"
            placeholder="Insira a data"
            required
            ></b-form-input>

            <b-form-group
            id="input-descricao"
            label-for="descricao"
            description="Descrição"
            ></b-form-group>

            <b-form-input 
            id="descricao"
            v-model="movimentoInterno.descricao"
            type="text"
            placeholder="Insira a descrição"
            required
            ></b-form-input>

            <b-form-group
            id="input-categoria"
            label-for="categoria"
            description="Categorias"
            ></b-form-group>
            <b-form-select
            id="categoria"
            v-model="movimentoInterno.categoria"
            :options="options"
            placeholder="Insira uma categoria"
            required
            ></b-form-select>

            <b-form-group
            id="input-valor"
            label-for="valor"
            description="Valores"
            ></b-form-group>
            <b-form-input 
            id="valor"
            v-model="movimentoInterno.valores"
            type="number"
            placeholder="Insira o valor gasto"
            required
            ></b-form-input>
        </b-form>

    </b-modal>
</template>

<script>
export default {
    name: "FormMovimento",
    data: function() {
        return {
            movimentoInterno: {
                id: '',
                data_mov: '',
                descricao: '',
                categoria: '',
                valor: ''
            },
            options:[{ text: 'Escolha uma categoria', value: null }, 'esporte', 'lazer', 'jogos', 'contas', 'alimentação', 'vestuário']
        }
    },
    props: {
        title: String,
        idModal: String,
        movimento: {
            id: Number,
            data_mov: String,
            descricao: String,
            categoria: String,
            valor: Number
        }
    },
    methods: {
        checkForm: function () {
            this.errors = [];
            if (!this.movimentoInterno.data_mov)
                this.errors.push("Informe a data");
            if (!this.movimentoInterno.descricao)
                this.errors.push("Informe a descrição");
            if (!this.movimentoInterno.categoria)
                this.errors.push("Informe a categoria");
            if (!this.movimentoInterno.valor)
                this.errors.push("Informe o valor gasto");
            
            console.log(this.errors)
            return this.errors.length == 0;
        },
        ok: function() {
            console.log('teste se a função de adicionar funciona')
            this.movimentoInterno.valor = parseFloat(this.movimentoInterno.valor)
            this.$emit('confirmed', this.movimentoInterno);
        },
        reset: function() {
            this.movimentoInterno.id = this.movimento.id
            this.movimentoInterno.data_mov = this.movimento.data_mov
            this.movimentoInterno.descricao = this.movimento.descricao
            this.movimentoInterno.categoria = this.movimento.categoria
            this.movimentoInterno.valor = this.movimento.valor               
        }
    
    },