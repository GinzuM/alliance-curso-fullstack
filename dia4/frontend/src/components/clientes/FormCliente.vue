<template>
    <b-modal :id="idModal ? idModal : ('modal-confirm-edit-'+cliente.codigo)" :title="title" v-on:ok="ok()" v-on:cancel="reset()">
       <p v-if="errors.length">
            <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
            <ul>
            <li v-for="error, index in errors" v-bind:key="index">{{ error }}</li>
            </ul>
        </p>
        <b-form>
            <b-form-group
            id="input-codigo"
            label-for="codigo"
            description="Código do cliente"

            ></b-form-group>
            <!--
            label="Código"
            description="Código do cliente"
            -->
            <b-form-input 
            v-model="clienteInterno.codigo"
            type="number"
            placeholder="Insira o código do cliente"
            required
            ></b-form-input>
            <b-form-group
            id="input-nome"
            label-for="nome"
            description="Nome do cliente"

            ></b-form-group>
            <!--
                label="Nome"
                description="Nome do cliente"
            -->
            <b-form-input 
            id="nome"
            v-model="clienteInterno.nome"
            type="text"
            placeholder="Insira o nome do cliente"
            required
            ></b-form-input>
            <b-form-group
            id="input-login"
            label-for="login"
            description="Login do Cliente"

            ></b-form-group>
            <!--
                label="Login"
                description="Login do Cliente"
            -->
            <b-form-input 
            id="login"
            v-model="clienteInterno.login"
            type="string"
            placeholder="Insira o Login do cliente"
            required
            ></b-form-input>
            <b-form-group
            id="input-email"
            label-for="email"
            description="Nome do Cliente"

            ></b-form-group>
            <!--
                label="Email"
                description="Nome do Cliente"
            -->
            <b-form-input 
            id="email"
            v-model="clienteInterno.email"
            type="text"
            placeholder="Insira o E-mail do cliente"
            required
            ></b-form-input>
        </b-form>
    </b-modal>
</template>

<script>
export default {
    name: "Formcliente",
    data: function() {
        return {
            clienteInterno: {
                codigo: '',
                nome: '',
                login: '',
                email: ''
            }
        }
    },
    props: {
        title: String,
        idModal: String,
        cliente: {
            codigo: Number,
            nome: String,
            login: String,
            email: String
        }
    },
    methods: {
        checkForm: function () {
            this.errors = [];
            if (!this.clienteInterno.nome)
                this.errors.push("Informe o nome do cliente");
        
            if (!this.clienteInterno.login)
                this.errors.push("Informe o login do cliente");
            if (!this.clienteInterno.email)
                this.errors.push("Informe o e-mail do cliente");
            else {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!   re.test(this.clienteInterno.email)) 
                    this.errors.push("Informe um e-mail válido");
            }
            console.log(this.errors)
            return this.errors.length == 0;
        },
        ok: function(event) {
            if (!this.checkForm())
                event.preventDefault();
            else
                this.$emit('confirmed', this.usuarioInterno);
        },
        reset: function() {
            this.clienteInterno.codigo = this.cliente.codigo
            this.clienteInterno.nome = this.cliente.nome
            this.clienteInterno.login = this.cliente.login
            this.clienteInterno.email = this.cliente.email             
        }
    },
    mounted() {
        this.reset();
    }
}
</script>

<style>

</style>