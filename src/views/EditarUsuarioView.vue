<template>
    <h5>actualizar datos</h5>
    <div class="container">
        <div class="abs-center">
            
            <form action="" @submit.prevent="guardar()">
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
    <label for="" class="col-sm-3 col-form-label">Celular:</label>
    <div class="col-sm-8">
    <input type="number" class="form-control" id="nombre" placeholder="Celular" 
    v-model="usuario.celular">
    </div>
  </div>
  <br>
                
                <button type="submit" class="btn btn-primary m-2">Guardar</button>
                <button @click="$router.push({name : 'usuarios'})" class="btn btn-light m-2">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'editarUsuarioView',
    data() {
        return {
            usuario:{
                nombre: null,
                direccion: null,
                celular: null
            }
        }
    },
    methods: {
        getUsuario(){
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/usuarios/"+this.$route.params.id
            })
            .then(response => {
                this.usuario = response.data;
            console.log(response);
            })
            .catch(e => console.log(e));
        },
        guardar(){
            axios({
                method: "patch",
                url: process.env.VUE_APP_RUTA_API+"/usuarios/"+this.$route.params.id,
                data: this.usuario
            })
            .then(response => {
                
                alert("datos actualizados");
                this.$router.push({name: 'usuarios'});
            })
            .catch(e => console.log(e));
        }
    },
    computed: {
    },
    mounted() {
        this.getUsuario()
    },
    components: {
    }
}
</script>
