
<template>
  <h2>consumo</h2>
  <form @submit.prevent="agregarConsumo()">
  <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">Cantidad en m3:</label>
    <div class="col-sm-3">
    <input type="number" class="form-control" id="nombre" placeholder="Cantidad" 
    v-model="consumo.cantidad">
    </div>
  </div>
  <br>
  <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">fecha toma lectura:</label>
    <div class="col-sm-3">
    <DatePicker type="date"  class="form-control" id="nombre" placeholder="seleccione fecha" 
    v-model="consumo.fecha" lang="es" format="dd-MM-YYYY"></DatePicker>
    </div>
  </div>
  <br>
  <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">total a pagar:</label>
    <div class="col-sm-3">
    <input type="text" class="form-control" id="nombre" placeholder="total"
    v-model="caltotal" disabled>
    
    </div>
  </div>
  <br>
  <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">seleccionar usuario:</label>
    <div class="col-sm-3">
      
      <select v-model="consumo.usuarioid" class="form-select" id="docente">
        
           <option v-for="usuario in usuarios" :value="usuario.id">{{usuario.nombre}}</option>
  </select>
  
    </div>
  </div>
  <br>
  <button type="submit" class="btn btn-primary">Registrar</button>
</form>

<br>

<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">cantidad m3</th>
      <th scope="col">fecha lectura</th>
      <th scope="col">total a pagar</th>
      <th scope="col">usuarioid</th>
      <th scope="col">opciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="value of consumos">
      <th scope="row">{{value.id}}</th>
      <td>{{value.cantidad}}</td>
      <td>{{new Date(value.fecha).toLocaleDateString()}}</td>
      <td>{{value.total}}</td>
      <td>{{value.usuarioid}}</td>
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
            mes : null,
            calculartotal: 10
            
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
          console.log(x);
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
          console.log(mes);
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
        caltotal(){
          return this.consumo.total= this.calculartotal * this.consumo.cantidad;
        }
    
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


