# Proyectos de Manipulación de Cadenas

Este repositorio contiene dos proyectos relacionados con la manipulación de cadenas de texto. Cada proyecto aborda un problema específico: la decodificación de mensajes con paréntesis y la verificación de si se puede formar un palíndromo mediante un solo intercambio de letras.

## Tabla de Contenidos

1. [Decodificación de Mensajes con Paréntesis](#decodificación-de-mensajes-con-paréntesis)
2. [Verificación de Palíndromo con Intercambio](#verificación-de-palíndromo-con-intercambio)
3. [Cómo Ejecutar los Proyectos](#cómo-ejecutar-los-proyectos)
4. [Requisitos](#requisitos)

## Decodificación de Mensajes con Paréntesis

### Descripción

En este proyecto, se toma una cadena de texto en la que algunas letras están rodeadas por paréntesis. El contenido dentro de los paréntesis debe ser invertido y los paréntesis deben ser eliminados en el resultado final. Es posible que los paréntesis estén anidados, por lo que se debe manejar correctamente la inversión de los caracteres en el orden correcto.

# Verificación de Palíndromo con Intercambio

Este proyecto consiste en verificar si es posible convertir una cadena de texto en un palíndromo realizando un solo intercambio de letras. Un palíndromo es una palabra que se lee igual hacia adelante y hacia atrás.

## Descripción

La función principal del proyecto es `getIndexsForPalindrome`, que recibe una cadena de caracteres y determina si es posible transformarla en un palíndromo con un único intercambio de letras. 

### Comportamiento de la función

- Si la cadena ya es un palíndromo, la función devuelve un array vacío (`[]`).
- Si no se puede formar un palíndromo con un solo intercambio, la función devuelve `null`.
- Si se puede formar un palíndromo con un único intercambio, la función devuelve un array con los dos índices de los caracteres que deben ser intercambiados.


### Ejemplos-de-Decodificación-y-de-Palídromo

```javascript
const a = decode('hola (odnum)');
console.log(a); // Output: "hola mundo"

const b = decode('(olleh) (dlrow)!');
console.log(b); // Output: "hello world!"

const c = decode('sa(u(cla)atn)s');
console.log(c); // Output: "santaclaus"
 
 -------------

```javascript
getIndexsForPalindrome('anna'); // Output: []
getIndexsForPalindrome('abab'); // Output: [0, 1]
getIndexsForPalindrome('abac'); // Output: null
getIndexsForPalindrome('aaaaaaaa'); // Output: []
getIndexsForPalindrome('aaababa'); // Output: [1, 3]
getIndexsForPalindrome('caababa'); // Output: null
