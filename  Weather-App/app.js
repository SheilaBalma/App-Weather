const apiKey = 'Tu_Api_Key'; // Aqui tu clave de la APi
let datosClimaActual;
let esCelsius = true; 

// Obtener clima de Mykonos 
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
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${nuevaCiudad}&appid=${apiKey}&units=metric&lang=es`;
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
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric&lang=es`;
    fetch(urlApi)
        .then(respuesta => respuesta.json())
        .then(datos => {
            datosClimaActual = datos;
            mostrarClima(datos);
        })
        .catch(error => console.error('Error al obtener el clima:', error));
}

// Cambiar el fondo según el icono del clima
function cambiarFondoSegunIcono(icono) {
    if (icono.startsWith('01')) {
        // Sol
        document.body.className = "fondo-sol";
    } else if (icono.startsWith('02') || icono.startsWith('03') || icono.startsWith('04')) {
        // Nublado
        document.body.className = "fondo-nublado";
    } else if (icono.startsWith('09') || icono.startsWith('10')) {
        // Lluvia
        document.body.className = "fondo-lluvia";
    } else if (icono.startsWith('13')) {
        // Nieve
        document.body.className = "fondo-nieve";
    } else if (icono.startsWith('50')) {
        // Niebla o viento
        document.body.className = "fondo-viento";
    }
}

function mostrarClima(datos) {
    const icono = `http://openweathermap.org/img/wn/${datos.weather[0].icon}.png`;
    cambiarFondoSegunIcono(datos.weather[0].icon);
    const ciudad = datos.name;
    const fecha = obtenerFechaActual();
    const temperatura = esCelsius ? datos.main.temp : (datos.main.temp * 9/5) + 32; 
    const tempMax = esCelsius ? datos.main.temp_max : (datos.main.temp_max * 9/5) + 32; 
    const tempMin = esCelsius ? datos.main.temp_min : (datos.main.temp_min * 9/5) + 32; 
    const humedad = datos.main.humidity;
    const velocidadViento = datos.wind.speed;
    const direccionViento = datos.wind.deg;
    const descripcion = datos.weather[0].description;

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

function obtenerPronostico5Dias(ciudad) {
    const urlApiPronostico = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
    fetch(urlApiPronostico)
        .then(respuesta => respuesta.json())
        .then(datos => {
            mostrarPronostico(datos);
        })
        .catch(error => console.error('Error al obtener el pronóstico:', error));
}

// Función para mostrar el pronóstico de 5 días con los días correctos
function mostrarPronostico(datos) {
    const pronosticosDiarios = [];
    const horasDeseadas = ['12:00:00'];

    datos.list.forEach((item) => {
        const horaActual = item.dt_txt.split(' ')[1];
        if (horasDeseadas.includes(horaActual)) {
            pronosticosDiarios.push(item);
        }
    });

    const pronosticoHtml = pronosticosDiarios.map(dia => {
        const fecha = new Date(dia.dt * 1000).toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
        const temperaturaMin = dia.main.temp_min;
        const temperaturaMax = dia.main.temp_max;
        const descripcion = dia.weather[0].description;
        const icono = `http://openweathermap.org/img/wn/${dia.weather[0].icon}.png`;

        return `
            <div class="dia-pronostico">
                <h3>${fecha}</h3>
                <img src="${icono}" alt="${descripcion}">
                <p>${descripcion}</p>
                <p>Temp Min: ${temperaturaMin.toFixed(1)}°C</p>
                <p>Temp Max: ${temperaturaMax.toFixed(1)}°C</p>
            </div>
        `;
    }).join('');

    document.getElementById('contenedorPronostico').innerHTML = pronosticoHtml;
}

// Para mostrar el pronóstico al hacer clic en el botón
document.getElementById('mostrar-pronostico').addEventListener('click', function() {
    if (datosClimaActual && datosClimaActual.name) {
        obtenerPronostico5Dias(datosClimaActual.name);
    }
});

