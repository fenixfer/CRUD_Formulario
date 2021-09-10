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
      localStorage.setItem('tareas', JSON.stringify(state.tareas))

    },
    //tramos lo de la actions
    delete(state, payload){
      //Utilizamos filter de javascript 
      state.tareas = state.tareas.filter( item => item.id !== payload)
      //Igual cuando eliminamos uno guarda un nuevo donde ya no este ese id y los datos
      localStorage.setItem('tareas', JSON.stringify(state.tareas))
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
      localStorage.setItem('tareas', JSON.stringify(state.tareas))
    }
  },
  actions: {
    cargarLocalStorage({ commit }) {
      //Esto siempre y cuando existan esas tareas
      if(localStorage.getItem('tareas')){
        const tareas = JSON.parse(localStorage.getItem('tareas'))
        commit('cargar', tareas)
        return
      }
      //tareas declaras aqui es igual a la variable declarado arriba
      localStorage.setItem('tareas', JSON.stringify([]))
    },

    setTareas({commit}, tarea){
      commit('set', tarea)
    },
    //Para el botón eliminar y ese id es de la tarea lo necesitamos
    deleteTareas({commit}, id){
      commit('delete', id)
    },
    //En id es el mismo que obtenemos de la url
    obtenerTarea({commit}, id){
      commit('tarea', id)
    },
    //la acción o método para actualizar 
    actualizarTarea({commit}, tarea){
      commit('actualizar', tarea)
    }
  },
  modules: {
  }
})
