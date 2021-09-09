<template>
<!--Tipo texto, las clase es de bootstrap -->
<!--FORMULARIO--> 
<!--Ocupamos el submit para que cuando apretemos llamamos al método declarado abajo
y el botón lo procese y lo pinte con console-->
<!--//TODO: POR DEFECTO TODOS LOS FORMULARIOS DE HTML HACEN EL ENVIO POR GET POR LO TANTO SE REFRESCA EL SITIO WEB PARA EVITAR EL PROCESAMIENTO COLOCAMOS .prevent en el submit pero ya no va a quitar los campos que llenamos-->
  <form @submit.prevent="procesarFormulario">
    <!--Ocupamos el v-model para que tenga interacción en tiempo real
    y este se lo pase a texto LO CAMBIAMOS POR OBJETO
    Y AHORA ES TAREA.NOMBRE definido en el data(), el v-model es para la comunicación-->
    <!-- TEXTO INPUT --------------------------------------------------->
    <!-- Se utiliza el Trim este se pone en v-model, 
    el trim hace que si ponemos espacios al insertar algo los elimine -->
    <input 
    type="text" 
    class="form-control my-2" 
    placeholder="Ingrese nombre"
    v-model.trim="tarea.nombre"
    >
    <!--------------CHECKBOX--------------------------------------------------->
    <!--Aqui van los checkbox igual las clases son de bootstrap-->
    <div class="form-check form-check-inline">
      <!-- //TODO: En el input también ocupamos el v-model para capturar el dato -->
      <!-- El value es el que se pasa al arreglo categorias[], SE PONE EL NOMBRE javascript -->
      <!-- Tenemos que poner el v-model para que lo capture el array categorias -->
      <input type="checkbox" id='check-1' class="form-check-input" 
      v-model="tarea.categorias" value="javascript">
      <!--Como lavel nos da un for entonces tenemos que declarar un id en el input anterior -->
      <label for="check-1" class="form-check-label">JavaScript</label>
    </div> 
    <!--Hacemos otro pero cambiando el id y el nombre en el label -->
    <div class="form-check form-check-inline">
      <input type="checkbox" id='check-2' class="form-check-input"
      v-model="tarea.categorias" value="nodejs">
      <!--Como laver nos da un for entonces tenemos que declarar un id en el input anterior -->
      <label for="check-2" class="form-check-label">Node.js</label>
    </div> 
    <!------------------------RADIOS--------------------------------------------->
    <div class="mt-2">
      <div class="form-check form-check-inline">
        <!--Para que seleccione solo una opción ponemos los value -->
        <input type="radio" id="radio-1" class="form-check-input" 
        v-model='tarea.estado' value='urgente'>
        <label for="radio-1" class="form-check-label">Urgente</label>
      </div>
      <!--OTRO----->
      <div class="form-check form-check-inline">
        <input type="radio" id="radio-2" class="form-check-input" 
        v-model='tarea.estado' value= 'tranquilo'>
        <label for="radio-2" class="form-check-label">Tranquilo</label>
      </div>
    </div>
    <!--------------------Number para agregar numero con botnones----------------------->
    <!--Para que no se podamos insertar alguna letra o texto escribiendo
    a entonces le pedimos v-model que a fuerzas queremos un numero-->
    <div class='mt-2'>
      <input type="number"
      class='form-control'
      v-model.number='tarea.numero'>
    </div>
  <!----------------------BOTON PARA PROCESAR---------------------------------->
  <!----------- Submit para que procese el formulario----------------->
  <!--Clases de bootstrap pero el btn-primary es para que abarque todo el espacio------>
  <div class='d-grid'>
    <!--Desabilitamos el botón y cuando el usuario introduzca un dato se habilite con (disabled)--->
    <!-- Para hacer dinamico el botón ponemos el v-bind o los : antes del disabled y que se comporte como bool 
    pero se utiliza propiedades computadas y la llamamos-->
    <button class='btn btn-primary btn-dark mt-2' type="submit" :disabled='bloquear'>
      Enviar
    </button>
  </div>

  </form>
  <hr>
  <p>
    <!--Se trae todo lo que tiene el objeto tarea -->
    {{tarea}}
  </p>
</template>

<script>


export default {
  name: 'Home',
  components: {
  },
  //TODO: Traemos o agarramos lo que ponemos en el imput declaramos data
  data() {
    return {
      //Esta vacio porque se le pasa lo del input 'Ingrese nombre'
      // Para que se vea mas ordenado trabajamos con objetos
      //texto: ''
      tarea: {
        nombre: '',
        //ocupamos array porque en los checkbox el usuario puede seleccionar uno o varios
        categorias: [],
        //para los radios
        estado: '',
        numero: 0
      }

    }
  },
  methods: {
    //este es cuando presionemos el boton nos lo pinte en la consola
    procesarFormulario(){
      //muy bueno un console para ver si los datos se van a guardar
      console.log(this.tarea)
      //SI FUNCIONA EL CONSOLE PODEMOS HACER UN MÉTODO PARA ENVIAR ESOS DATOS
      // --------------------
      if(this.tarea.nombre.trim() === ""){
        console.log('Campo vacio')
        //Este return hace que se salga de este if
        return
      }
      console.log('No esta vacio')
      //-------------------------------------------------------
      //TODO: SI TODO SALE BIEN QUITAMOS LOS CONSOLE ANTERIORES Y MANDAMOS LOS DATOS A UNA BASE DE DATOS O GUARDAMOSç
      //TODO: Y LO PONEMOS EN ESTA PARTE 
      //--------------------------------------------------------
      //Este this.tarea es para que cuando procese los datos al final limpie todos los campos
      //Es como refrescar
      this.tarea = {
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }

      }
  },
  //Las propiedades computadas siempre devuelven algo
  computed: {
    bloquear(){
      //true bloquea al boton 
      return this.tarea.nombre.trim() === '' ? true : false
    }
  }
}
</script>
