<template>
  
  <h2>Usuarios</h2>
  
  <form @submit.prevent="agregarUsuario()">
  <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">Nombre completo:</label>
    <div class="col-sm-8">
    <input type="text" class="form-control" id="nombre" placeholder="nombre" 
    v-model="usuario.nombre">
    </div>
  </div>
  <br>
  <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">direccion:</label>
    <div class="col-sm-8">
    <input type="text" class="form-control" id="nombre" placeholder="direccion" 
    v-model="usuario.direccion">
    </div>
  </div>
  <br>
  <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">celular:</label>
    <div class="col-sm-3">
    <input type="number" class="form-control" id="" placeholder="celular" 
    v-model="usuario.celular">
    </div>
  </div>
  <br>
  <button type="submit" class="btn btn-primary">Registrar</button>
</form>
<br>
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Nombre completo</th>
      <th scope="col">direccion</th>
      <th scope="col">Celular</th>
      <th scope="col">opciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="value of usuarios">
      <td>{{value.id}}</td>
      <td>{{value.nombre}}</td>
      <td>{{value.direccion}}</td>
      <td>{{value.celular}}</td>
      <td><button class="btn btn-warning m-2" @click="irA('editar', value.id)">Editar</button>
          <button class="btn btn-danger" @click="irA('eliminar', value.id)">Eliminar</button></td>

    </tr>
    
  </tbody>
</table>

</template>

<script>

  export default {
      name: 'areaVue',
      data(){
          return {
            usuario: {
              nombre: null,
              direccion: null,
              celular: null
            },
            usuarios: []
            
          }
          
      },
      methods: {
        agregarUsuario() {
            axios({
                method: "post",
                url: process.env.VUE_APP_RUTA_API+"/usuarios",
                data: this.usuario
            })
                .then(response => {
                    console.log(response);
                    this.usuario.nombre = null;
                    this.usuario.direccion = null;
                    this.usuario.celular = null;
                    this.getUsuario();
                    alert("datos registrados correctamente");
                    
                })
                .catch(e => console.log(e));
        },
        getUsuario() {
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/usuarios"
            })
                .then(response => {
                    this.usuarios = response.data;
                    console.log(response);
                })
                .catch(e => console.log(e));
        },
        irA(opcion, usuario_id) {
            if (opcion === 'editar') {
                this.$router.push({ name: 'editarUsuario', params: { id: usuario_id } });
            } else {
                if (confirm("Esta seguro de eliminar area")) {
                    axios({
                        method: "delete",
                        url: process.env.VUE_APP_RUTA_API+"/usuarios/"+usuario_id
                    })
                        .then(response => {
                            this.getUsuario();
                            console.log(response);
                        })
                        .catch(e => console.log(e));
                }
            }
      }
    }, 
      computed: {
        
       
      },
      mounted(){
        this.getUsuario();
        
      },
      components: {
        
      }
    }
</script>

<style>

</style>


