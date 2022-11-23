<template>
    activo: {{$route.params.id}}
    <div class="container">
        <div class="abs-center">
            
            <form action="" @submit.prevent="guardar()">
                <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">cantidad:</label>
    <div class="col-sm-8">
    <input type="text" class="form-control" id="nombre" placeholder="cantidad" 
    v-model="consumo.cantidad">
    </div>
  </div>
  <br>
  <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">fecha:</label>
    <div class="col-sm-8">
    <input type="text" class="form-control" id="nombre" placeholder="responsable" 
    v-model="consumo.fecha">
    </div>
  </div>
  <br>
  <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">total:</label>
    <div class="col-sm-8">
    <input type="text" class="form-control" id="nombre" placeholder="numero" 
    v-model="consumo.total">
    </div>
  </div>
  <br>

  <div class="form-group row">
    <label for="" class="col-sm-3 col-form-label">idusuario:</label>
    <div class="col-sm-8">
    <select v-model="consumo.usuarioid" class="form-select" id="docente">
        
           <option v-for="usuario in usuarios" :value="usuario.id">{{usuario.nombre}}</option>
  </select>
    </div>
  </div>
  <br>
                
                <button type="submit" class="btn btn-primary m-2">Guardar</button>
                <button @click="$router.push({name : 'consumo'})" class="btn btn-light m-2">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'editarActivoView',
    data() {
        return {
            consumo:{
                cantidad: null,
                fecha: null,
                total: null,
              usuarioid : null
            },
            usuarios:[]
        }
    },
    methods: {
        getConsumo(){
            axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/consumos/"+this.$route.params.id
            })
            .then(response => {
                this.consumo = response.data;
            console.log(response);
            })
            .catch(e => console.log(e));
        },
        guardar(){
            axios({
                method: "patch",
                url: process.env.VUE_APP_RUTA_API+"/consumos/"+this.$route.params.id,
                data: this.consumo
            })
            .then(response => {
                
                alert("datos actualizados");
                this.$router.push({name: 'consumo'});
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
    },
    computed: {
    },
    mounted() {
        this.getConsumo()
        this.getUsuario()
    },
    components: {
    }
}
</script>
