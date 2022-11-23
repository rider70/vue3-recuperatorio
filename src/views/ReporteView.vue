
<template>
  <h2>Reportes</h2>
<br>
<form action="">
  <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">Buscador por mes: </label>
    <div class="col-sm-3">
      
      <select v-model="mes" class="form-select" id="">
        <option value="">Mostrar todos</option>
        <option value="0">enero</option>
        <option value="1">febrero</option>
        <option value="2">marzo</option>
        <option value="3">abril</option>
        <option value="4">mayo</option>
        <option value="5">junio</option>
        <option value="6">julio</option>
        <option value="7">agosto</option>
        <option value="8">septiembre</option>
        <option value="9">octubre</option>
        <option value="10">noviembre</option>
        <option value="11">diciembre</option>
      
      </select>

  
</div>
<div class="col-sm-1">
<button class="btn btn-primary" @click.prevent="filtermes(mes)">Buscar</button>
</div>
</div>
</form>
<br>
<form action="">
  <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">Buscador usuario: </label>
    <div class="col-sm-3">
      
      <select v-model="consumo.usuarioid" class="form-select">
        <option value="">Mostrar todos</option>
        <option v-for="usuario in usuarios" :value="usuario.id">{{usuario.nombre}}</option>
      
      </select>
  
</div>
<div class="col-sm-1">
<button class="btn btn-primary" @click.prevent="lista(consumo.usuarioid)">Buscar</button>
</div>
</div>
</form>
<br>

<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">cantidad m3</th>
      <th scope="col">fecha lectura</th>
      <th scope="col">total a pagar</th>
      <th scope="col">opciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="value of consumos">
      <th scope="row">{{value.id}}</th>
      <td>{{value.cantidad}}</td>
      <td>{{new Date(value.fecha).toLocaleDateString()}}</td>
      <td>{{value.total}}</td>
      <td><button class="btn btn-warning m-2" @click="irA('editar', value.id)">Editar</button>
          <button class="btn btn-danger" @click="irA('eliminar', value.id)">Eliminar</button></td>

    </tr>
    
  </tbody>
</table>
</template>

<script>
import DatePicker from 'vue3-datepicker'
  export default {
      name: 'consumoVue',
      data(){
        
          return {
            consumo: {
              cantidad: null,
              fecha: null,
              total: null,
              usuarioid : null
            },
            consumos: [],
            textoBuscar:'',
            unique:[],
            usuarios:[],
            mes : null
            
          }
          
      },
      methods: {
        agregarConsumo() {
            axios({
                method: "post",
                url: process.env.VUE_APP_RUTA_API+"/consumos",
                data: this.consumo
            })
                .then(response => {
                    console.log(response);
                    this.consumo.cantidad = null;
                    this.consumo.fecha = null;
                    this.consumo.total = null;
                    this.consumo.usuarioid = null;
                    this.getConsumo();
                    alert("datos registrados correctamente");
                    
                })
                .catch(e => console.log(e));
        },
        getConsumo() {
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/consumos?q="+this.textoBuscar
            })
                .then(response => {
                    this.consumos = response.data;
                    console.log(response);
                })
                .catch(e => console.log(e));
        },
        irA(opcion, consumo_id) {
            if (opcion === 'editar') {
                this.$router.push({ name: 'editarConsumo', params: { id: consumo_id } });
            } else {
                if (confirm("Esta seguro de eliminar ")) {
                    axios({
                        method: "delete",
                        url: process.env.VUE_APP_RUTA_API+"/consumos/"+consumo_id
                    })
                        .then(response => {
                            this.getConsumo();
                            console.log(response);
                        })
                        .catch(e => console.log(e));
                }
            }
      },
      getUsuario() {
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/usuarios?q="+this.textoBuscar
            })
                .then(response => {
                    this.usuarios = response.data;
                    console.log(response);
                })
                .catch(e => console.log(e));
        },
        lista(x){
          if(x){
         this.consumos = this.consumos.filter(
            con => {
              return con.usuarioid === x
            }
          )
        }
        else 
          this.getConsumo();
        
        },
        
        filtermes(mes){
          if(mes){
          this.consumos = this.consumos.filter(
            con => {
              return new Date(con.fecha).getMonth() == mes;
              
            }
          )
          
        }
        else
        this.getConsumo();   
         
        
        }
        
           
    }, 
    
      computed: {
       
        
    
    
      },
      mounted(){
        this.getConsumo();
        this.getUsuario();
        

        
        
      },
      components: {
        DatePicker
      }
  }
  
          
</script>

<style>

</style>


