// Como importar un json en ESModules de forma eficiente
// Como estamos trabajando con ESModules no podemos utilizar require() de common JS.
// Entonce importamos la funcion 'createRequire' del modulo 'module' de node
import { createRequire } from 'node:module'
export const readJSON = createRequire(import.meta.url) // Creamos la constante que sera la funcion que importa pasandole como argumento import.meta.url que es un objeto global el cual tiene informacion de la ruta del proyecto, esto devolvera una funcion que podremos utilizar como el clasico require para importar el json
