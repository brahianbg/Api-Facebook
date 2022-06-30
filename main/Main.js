const API= "https://graph.facebook.com/";
const CAMPOS= "?fields=id,name,email,picture,birthday&";
const TOKEN= "EAAGRYXBy3vYBAO65YzzJQSorDpCPyFN32W2CxXWkPsat9xiOQpMLMFUHbAHlBliYR4gwYmPVYaVtre2bobQlqWdLgsZBxicuLQjnZCNge8XtG4HNnJmML2zABdZCcNrGGzAT3ADE3hIdCZCLbZBiAZChZBJe88NKNs4cU5eyLsV8QZDZD";
const app = Vue.createApp({
  data() {
    return {
      message: 'Hola aprendices SENA',
      busqueda: null,
      result: null,
      error: null,
      favoritos: new Map()//creamos un map para guardar los favoritos
    }
  },
// created hace parte de los ciclos de vida del vue
//aquí vamos a obtener los favoritos que estan en el localstorage

  created(){
    //reconstruir los favoritos
    const FavoritosGuardados = JSON.parse(window.localStorage.getItem("misFavoritos"))
    //console.log(FavoritosGuardados)

    //verificamos que si existe, si tiene una long haga lo siguiente
    //esta evaluando si existe, a demas midiendo su longitud
    //se abrevia con ?
    if(FavoritosGuardados?.lenght){
      //recramos el map con un nuevo nombre
      //creo un map que es una coleccion con key y value
      const favoritosnew = new Map(
        //me valgo del metodo map para obtener el id como un key y el arreglo
        //completo como el value de mi Map
        FavoritosGuardados.map(alias=>[alias.id,alias])
        )
        //asignamos a la variable favoritos de la instanci del valor del nuevo 
        //favoritosnew
      this.favoritos = favoritosnew
    }

  },
  //montamos información en el HTML o en el div app
computed:{
  estaFavorito(){
    return this.favoritos.has(this.result.id)
  },

  TodosFavoritos(){
    //pasamos la informacion a un autentico array
    return Array.from(this.favoritos.values())//values es un meto que tree los los valores sin las claves
  }
},
  methods: { // la palabra function ya no es necesaria por que vamos a usar methods
    async Buscar() {
      // depende el error
      this.result = this.error = null // cada vez que de en el boton, primero se esjecuta
      try {
        const response = await fetch(API + this.busqueda + "?fields=id,name,email,picture&access_token="  + TOKEN)
        if(!response.ok) throw new Error("Usuario no encontrado")
        //ahora quiero traer la info en formato json
        const data = await response.json()
        console.log(data)
        this.result = data //cabiar true por data
      } catch (error) {
        this.error = error //referenciamos el error de la variable con el error por parametro
      }
      finally{
      this.busqueda = null // para limpiar la barra de busqueda, depues de buscar todo busqueda vuelve a null
      }

    },//aqí se cerro el metodo de buscar

    addFavoritos(){
        this.favoritos.set(this.result.id, this.result)
        this.actualizarStorage()
    },
    RemoverFavoritos(){
      this.favoritos.delete(this.result.id)
      this.actualizarStorage()
    },

    actualizarStorage(){
      window.localStorage.setItem('misFavoritos',JSON.stringify(this.TodosFavoritos)) //
    },

    mostrarFavorito(parametro){
      //tipo array con objetos de javasp o tipo json
      this.result = parametro
    }


  }
}
)

//415872500553228 jovy
//100006229876280 brahian