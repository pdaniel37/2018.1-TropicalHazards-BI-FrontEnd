<template>
  <div class="row grey lighten-4">
    <sidebar/>
    <div
      id="content"
      class="col m11">
      <div class="header center-align white">
        <small>Projeto: Mapa da Dengue no DF</small>
        <h3>
          {{ dashboard.name }}
        </h3>
      </div>
      <div class="grey lighten-4">
        <div class="custom-container">

          <h5>Dados do Observatório</h5>

          <div class="row">
            <div class="col s12 m4">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">
                    Cleiton Jr.
                  </span>
                  <p>
                    Criador
                  </p>
                </div>
              </div>
              <button
                class = "btn-large red"
                v-on:
                @click="deleteDashboard()">Deletar Dashboard
                <span class="fa fa-trash"/>
              </button>
            </div>
            <div class="col s12 m4">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">1.3 Gb</span>
                  <p>
                    De dados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="custom-container">
          <div class="row">
            <div class="col s12">
              <!-- vai ser iframe então lembrar de colocar tag de iframe com a classe de reixar IFRAME RESPONSIVO -->
              <img
                src="https://s3-us-west-2.amazonaws.com/i.cdpn.io/250639.eZENxO.12a72d88-e8ed-4403-b737-dfcbde7f008d.png"
                class="responsive-img">
            </div>
          </div>
          <div class="row white darken-1">
            <div class="col s12">
              <table class="table-responsive stripped">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Frequência (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>A</b></td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td><b>B</b></td>
                    <td>1.5</td>
                  </tr>
                  <tr>
                    <td><b>C</b></td>
                    <td>2.75</td>
                  </tr>
                  <tr>
                    <td><b>D</b></td>
                    <td>4.1</td>
                  </tr>
                  <tr>
                    <td><b>E</b></td>
                    <td>13</td>
                  </tr>
                  <tr>
                    <td><b>F</b></td>
                    <td>2.06</td>
                  </tr>
                  <tr>
                    <td><b>G</b></td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td><b>H</b></td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td><b>I</b></td>
                    <td>7</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col s12">
              <a
                href="#"
                class="btn-large waves-effect waves-light blue lighten-1 white-text">
                <span class="fa fa-download">Baixar dados usados</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex"
import SideBar from "@/components/Utils/SideBar"

export default {

    components: {
        "sidebar": SideBar,
    },
    data(){

        return {
            dashboard: {
                project: "",
                name: ""
            },
            user: {
                username: "",
                password: "",
                email: ""
            },
            isModalVisible: false,
        }
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },

    beforeMount(){
        this.getObservatorioDetail()
        this.loadUserInfo()
        this.modalScript()
    },
    methods: {

        deleteDashboard (){
            if (window.confirm("Deseja realmente deletar o dashboard ?")){
                this.$http.delete("dashboards/" + this.$route.params.id + "/", { headers: { "Authorization": "JWT " + localStorage.token } }).then(result => {
                    window.alert("dashboard deletado")
                    this.$router.replace("/home")
                    this.dashboard = result.data
                },
                error => {
                    window.alert("Erro ao deletar o dashboard")
                    error.log(error)
                })
            }
        },

        getObservatorioDetail(){
            this.$http.get("dashboards/" + this.$route.params.id + "/",  { headers: { "Authorization": "JWT " + localStorage.token } }).then(result => {
                this.dashboard = result.data
            },
            error => {
                error.log(error)
            })
        }
        ,
        loadUserInfo (){
            this.user.id = this.currentUser.id
            this.user.username = this.currentUser.name
            this.user.email = this.currentUser.email
        },

        showModal() {
            this.isModalVisible = true
        },
        closeModal() {
            this.isModalVisible = false
        },
        modalScript() {

            (document).ready(function(){
                (".modal").modal()
            });

            (document).ready(function(){
                ("select").formSelect()
            })
        }
    },
}
</script>

<style>


</style>
