# Weather App ☀️🌧️

Esta es una aplicación de clima desarrollada con JavaScript y utilizando la API de [OpenWeather](https://openweathermap.org/). Permite a los usuarios ver el clima actual y el pronóstico de 5 días para cualquier ciudad, así como la opción de buscar el clima según la ubicación actual del usuario.

## Características 🚀

- Muestra el clima actual de una ciudad por defecto (Mykonos).
- Búsqueda de clima por nombre de ciudad.
- Obtención del clima actual según la ubicación del usuario (requiere permisos de geolocalización).
- Pronóstico del clima para los próximos 5 días con intervalos de tiempo específicos.
- Conversión de la temperatura entre grados Celsius y Fahrenheit.
- Fondo dinámico que cambia según las condiciones climáticas (sol, nubes, lluvia, nieve, viento).

## Tecnologías utilizadas 🛠️

- **JavaScript**: Para la manipulación del DOM y la lógica de la aplicación.
- **HTML y CSS**: Estructura y estilos de la aplicación.
- **OpenWeather API**: Servicio de API para obtener los datos del clima.
- **GitHub Pages (opcional)**: Para desplegar la aplicación en la web.

## Instalación y uso 📋

1. Clona el repositorio en tu máquina local:
    ```bash
    git clone https://github.com/tu-usuario/weather-app.git
    ```

2. Obtén tu propia API Key de [OpenWeather](https://home.openweathermap.org/users/sign_up) y reemplázala en el archivo JavaScript:
    ```javascript
    const apiKey = 'TU_API_KEY_AQUI';
    ```

3. Abre el archivo `index.html` en tu navegador favorito.

## Funcionalidades detalladas ✨

### Clima actual

La aplicación muestra el clima actual de una ciudad por defecto (Mykonos). El usuario puede buscar el clima de otras ciudades utilizando la barra de búsqueda o ver el clima de su ubicación actual (requiere permisos de geolocalización).

### Pronóstico de 5 días

El pronóstico de 5 días muestra el clima diario, seleccionando una hora específica para representar el clima del día (por ejemplo, las 12:00). Cada día se muestra con su respectiva descripción, temperatura mínima, temperatura máxima e ícono del clima.

### Cambios en el fondo según el clima

El fondo de la aplicación cambia dinámicamente según las condiciones climáticas actuales:
- Sol ☀️: Se muestra un fondo claro y soleado.
- Nubes ☁️: Fondo nublado.
- Lluvia 🌧️: Fondo lluvioso.
- Nieve ❄️: Fondo nevado.
- Viento 🌬️: Fondo ventoso.

### Conversión de grados

Se puede cambiar la temperatura entre grados Celsius y Fahrenheit con solo un clic en el botón de conversión.

## Estructura del proyecto 📂

El proyecto tiene la siguiente estructura:
- `index.html`: Archivo principal de la aplicación.
- `style.css`: Estilos de la aplicación.
- `script.js`: Lógica principal de la aplicación en JavaScript.
- `README.md`: Documentación del proyecto.
