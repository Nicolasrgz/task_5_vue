const { createApp } = Vue

const app = createApp({
  data() {
    return {
      apiEvents: [],
      busqueda: "",
      filtroTitulo: [],
      checkedInput: [],
      categorias: [],
      
      filtroFechasUp: [],
      fechaEvento: [],
   
      eventosPasados: [] // Nueva propiedad para almacenar los eventos Pasados filtrados
    }
  },

  created() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing"
    fetch(url)
      .then(res => res.json())
      .then(data => { 
        this.apiEvents = data.events 
        this.currentDate = data.currentDate
        
        this.categorias = [... new Set (this.apiEvents.map(event => event.category))]

        this.fechaLimite = new Date(this.currentDate).getTime()

        
        this.eventosPasados = this.apiEvents.filter(event => event.fechaEvento < this.fechaLimite)

        this.eventosPasados = this.apiEvents.filter(event => {
            this.fechaEvento = new Date(event.date).getTime() // Obtiene la fecha del evento
            return this.fechaEvento < this.fechaLimite // Filtra los eventos Pasados
          })

        // this.eventsPast()
      })
      .catch(error => console.error(error))
  },

  methods: {

  },

  computed: {
    filtrarPorTitulo() {
      this.filtroTitulo = this.eventosPasados.filter(event => event.name.toLowerCase().includes(this.busqueda.toLowerCase()))
      console.log(this.filtroTitulo)
    },
  }
})

app.mount('#app')