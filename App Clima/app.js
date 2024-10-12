const apiKey = Clave-de-la-Api; // Aqui va tu clave
let datosClimaActual;
let esCelsius = true; 

// Obtener clima de Mykonos por defecto
const ciudad = 'Mykonos';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datosClimaActual = datos;
        mostrarClima(datos);
    })
.catch(error => console.error('Error al obtener el clima:', error));

// Buscar clima por ciudad
function BuscarCiudad(nuevaCiudad) {
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${nuevaCiudad}&appid=${apiKey}&units=metric`;
    fetch(urlApi)
        .then(respuesta => respuesta.json())
        .then(datos => {
            datosClimaActual = datos;
            mostrarClima(datos);
        })
        .catch(error => console.error('Error al obtener el clima:', error));
}

// Buscar clima por ubicación
function climaPorUbicacion(latitud, longitud) {
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric`;
    fetch(urlApi)
        .then(respuesta => respuesta.json())
        .then(datos => {
            datosClimaActual = datos;
            mostrarClima(datos);
        })
        .catch(error => console.error('Error al obtener el clima:', error));
}

// Función para mostrar el clima
function mostrarClima(datos) {
    const ciudad = datos.name;
    const fecha = obtenerFechaActual();
    const temperatura = esCelsius ? datos.main.temp : (datos.main.temp * 9/5) + 32; 
    const tempMax = esCelsius ? datos.main.temp_max : (datos.main.temp_max * 9/5) + 32; 
    const tempMin = esCelsius ? datos.main.temp_min : (datos.main.temp_min * 9/5) + 32; 
    const humedad = datos.main.humidity;
    const velocidadViento = datos.wind.speed;
    const direccionViento = datos.wind.deg;
    const descripcion = datos.weather[0].description;
    const icono = `http://openweathermap.org/img/wn/${datos.weather[0].icon}.png`;

     // Cambiar el fondo según el clima
     if (descripcion.includes("sol") || descripcion.includes("clear")) {
        document.body.className = "fondo-sol";
    } else if (descripcion.includes("nublado") || descripcion.includes("clouds")) {
        document.body.className = "fondo-nublado";
    } else if (descripcion.includes("lluvia") || descripcion.includes("rain")) {
        document.body.className = "fondo-lluvia";
    } else if (descripcion.includes("nieve") || descripcion.includes("snow")) {
        document.body.className = "fondo-nieve";
    } else if (descripcion.includes("viento") || descripcion.includes("wind")) {
        document.body.className = "fondo-viento";
    }


    contenedorClima.innerHTML = 
    `
    <h2>Clima en ${ciudad}</h2>
    <p>Fecha: ${fecha}</p>
    <img src="${icono}" alt="${descripcion}">
    <p>Descripción: ${descripcion}</p>
    <p>Temperatura: ${temperatura.toFixed(2)}°${esCelsius ? 'C' : 'F'}</p>
    <p>Temperatura Mínima: ${tempMin.toFixed(2)}°${esCelsius ? 'C' : 'F'}</p>
    <p>Temperatura Máxima: ${tempMax.toFixed(2)}°${esCelsius ? 'C' : 'F'}</p>
    <p>Humedad: ${humedad}%</p>
    <p>Viento: ${velocidadViento} m/s, dirección ${direccionViento}°</p>
    `;
}

// Cambiar grados
document.getElementById('cambiar-grados').addEventListener('click', function() {
    if (!datosClimaActual) return;
    esCelsius = !esCelsius;
    mostrarClima(datosClimaActual);
});

// Obtener ubicación
document.getElementById('buscar-ubicación').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            const latitud = posicion.coords.latitude;
            const longitud = posicion.coords.longitude;
            climaPorUbicacion(latitud, longitud);
        }, error => {
            console.error('Error al obtener la ubicación:', error);
            contenedorClima.innerHTML = '<p>No se pudo obtener la ubicación. Por favor, intente otra vez.</p>';
        });
    }
});

// Obtener fecha actual
function obtenerFechaActual() {
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones); 
}

// Guardar el dato de la nueva ciudad
document.getElementById('buscar-nueva-ciudad').addEventListener('submit', function(evento) {
    evento.preventDefault();
    const nuevaCiudad = document.getElementById('entradaCiudad').value;
    BuscarCiudad(nuevaCiudad);
});
