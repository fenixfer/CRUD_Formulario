import { createStore } from 'vuex'
//Para que regrese a la página de inicio utilizamos el router entonces aqui lo llamamos
import router from '../router' 
//Con esto empujamos a actualizar en la pagina de inicio en la mutación

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    }
  },
  mutations: {
    //LO DEL LOCAL STORAGE
    cargar(state,payload) {
      state.tareas = payload
    },
    //recibe lo de la actions setTarea
    //El payload es el de la tarea
    set(state, payload){
      //empujamos
      //hacemos esto para que emuje los datos introducidos al hombe y los guarde allà 
      state.tareas.push(payload)
      //ponemos console para ver si se esta empujando
      //console.log(state.tareas)
      //para guuardar se empuja 

    },
    //tramos lo de la actions
    delete(state, payload){
      //Utilizamos filter de javascript 
      state.tareas = state.tareas.filter( item => item.id !== payload)
    },
    tarea(state,payload){
      //Si el usuario pone un id para editar en la url aparecera una página con datos pero no queremos que vea eso
      //Entonces si no encuenta eso de cierto id que lo mande a la página de inicio
      if(!state.tareas.find(item => item.id === payload)){
        router.push('/')
        return //Este return hace que se salga del ciclo y avance
      }
      //la función find es de javascript que busca algo en el array
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    actualizar(state,payload){
      //la funcón map() también es de javascript y devuelve un array con una condición que nosotros queramos
      //SI ENCUENTRA ESA CONICIDENCIA ENTONCES DEVUELVE LO QUE VA DESPUÉS DEL ?
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)  
      //Con esto empujamos  al usuario en la página de inicio
      router.push('/')
    }
  },
  actions: {
    //ASYNC Y AWAIT CUANDO HACEMOS PETICIONES AL SERVIDOR
    //Este cargar datos debe de llamarse LeerDatos pero lo dejamos asi
    //Aqui consumimos la API de Firebase, leemos los datos o traemos lo datos de la base de datos hecha en Firebase
    async cargarLocalStorage({ commit }) {
      //LEER LA INFORMACIÓN DE LA BASE DE DATOS
      try {
        const res = await fetch('https://api-firebase-54afd-default-rtdb.firebaseio.com/tareas.json')
        const dataDB = await res.json()
        //console.log(dataDB)
        const arrayTareas = []
  
        //Para leer aqui recorremos el arreglos
        for (let id in dataDB){
          //empuja la tarea en individual
          arrayTareas.push(dataDB[id])
        }
        //console.log(arrayTareas)
        commit('cargar', arrayTareas)
        
    } catch (error) {
      console.log(error)
    }
    },
    //Async y Await es como pedir petición al servidor
    async setTareas({commit}, tarea){
      try {
        //tareas.json crea como
        //El await dice que espera la petición
        //La url necesita crear un documento en la base de datos y ponemos un nombre en ña url al ultimo que lleve .json
        //fetch recibe un objeto que va después de la url
        //PARA RECIBIR RESPUESTA DECLARAMOS UNA CONSTANTE PARA QUE LO GUARDE Y LA IMPRIMIMOS EN CONSOLE PARA PROBAR
        //SE PONIA COMILLAS SIMPRES PERO COMO NECESITAMOS QUE GUARDE POR ID LA PONEMOS EN LA URL CON COMILLAS INVERTIDAS PARA QUE PASEMOS tarea.id
        const res = await fetch(`https://api-firebase-54afd-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          //necesitamos un método utilizamos GET ES POR DEFECTO pero en realidad es PUT 
          method: 'PUT',
          //EL POST DA UN ID ALEATORIO Y ORDENA MEJOR LA INFORMACÓN PERO NOSOTROS YA HABIAMOS GENERADO UN ID ASI QUE AQUÍ SERIA REDUNDANTE 
          headers: {
            //Es la cabecera y siempre va asi (es opcional) pero siempre hay que ponerla
            //Solo que los datos que van a viajar en json
            'Content-Type': 'application/json'
          },
          //mandamos la tarea de setTareas pero no asi lo mandamos con body
          body: JSON.stringify(tarea)
        })
        //Recibimos lo que viene en json
        const dataDB = await res.json()
        //IMPRIMIMOS EN UN CONSOLE LA VARIABLE dataDB PARA VER SI FUNCIONA
        console.log(dataDB)
      } catch (error) {
        console.log(error)
      }
      commit('set', tarea)
    },
    //Para el botón eliminar y ese id es de la tarea lo necesitamos
    async deleteTareas({commit}, id){
      try {
        await fetch(`https://api-firebase-54afd-default-rtdb.firebaseio.com/tareas/${id}.json`, {
        method: 'DELETE', 
      })
      } catch (error) {
        console.log(error)
      }
      //Este commit es de la lista o tabla de tareas
      commit('delete', id)
    },
    //En id es el mismo que obtenemos de la url
    obtenerTarea({commit}, id){
      commit('tarea', id)
    },
    //la acción o método para actualizar 
    async actualizarTarea({commit}, tarea){
      try {
        const res = await fetch(`https://api-firebase-54afd-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })
      const dataDB = await res.json()
      //console.log(dataDB)
      commit('actualizar', dataDB)
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})