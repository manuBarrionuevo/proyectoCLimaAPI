const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})




function buscarClima(e) {
    e.preventDefault()

    //Validar 
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    /*   console.log(ciudad)
      console.log(pais) */

    if (ciudad === '' || pais === '') {

        mostrarError('Ambos Campos son Obligatorios')
        return
    }


    //consultar la API

    consultarAPI(ciudad, pais)

}

function mostrarError(mensaje) {

    const alerta = document.querySelector('.bg-red-100')

    if (!alerta) {
        //Crear una alerta

        const alerta = document.createElement('div')

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')

        alerta.innerHTML = `
 
 <strong class="font-bold">Error!</strong>
 <span class="block">${mensaje}</sapan>
 
 `

        container.appendChild(alerta)


        //Eliminar Alerta
        setTimeout(() => {
            alerta.remove()
        }, 2000)

    }



}

function consultarAPI(ciudad, pais) {

    const appId = '874d5e7fe35fc4bc9cc66d51dded9765'

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`


 spinner()

    fetch(url)
        .then(respuesta => {
            return respuesta.json()
        })
        .then(datos => {

            //limpiar html previo
            limpiaHTML()
            
            if(datos.cod === '404'){
                mostrarError('Ciudad no encontrada')
                return
            }

            //Imprime la respuesta en el html
            mostrarClima(datos)
        })

}


function mostrarClima(datos){
   
    const {name, main: {temp, temp_max, temp_min}} = datos

    const centigrados = kelvinACentigrado(temp) 
    const max = kelvinACentigrado(temp_max) 
    const min = kelvinACentigrado(temp_min) 

    const nombreCiudad = document.createElement('p')
    nombreCiudad.textContent = `Clima en ${name}`
    nombreCiudad.classList.add('font-bold','text-2xl')


    const actual = document.createElement('p')
    actual.innerHTML = `${centigrados} &#8451;`
    actual.classList.add('font-bold','text-6xl')

    const tempMaxima = document.createElement('p')
    tempMaxima.innerHTML = `MAX: ${max} &#8451;`
    tempMaxima.classList.add('text-xl')

    const tempMMinima = document.createElement('p')
    tempMMinima.innerHTML = `MIN: ${min} &#8451;`
    tempMaxima.classList.add('text-xl')


    const resultadoDiv = document.createElement('div')
    resultadoDiv.classList.add('text-center','text-white')

    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMaxima)
    resultadoDiv.appendChild(tempMMinima)
   

    resultado.appendChild(resultadoDiv)
}

function kelvinACentigrado(grados){
    return parseInt(grados - 273.15)
}


function limpiaHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function spinner(){

    limpiaHTML()

    const divSpinner = document.createElement('div')
    divSpinner.classList.add('sk-fading-circle')

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `

  resultado.appendChild(divSpinner)
}