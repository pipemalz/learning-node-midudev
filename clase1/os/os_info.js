// El modulo nativo os de node js nos permite interactuar con el sistema operativo. Para importar un modulo nativo de node se recomienda importarlo con el prefijo "node:nombre_del modulo"
const os = require('node:os')
import os from 'node:os'

console.log('Nombre del sistema operativo: ', os.platform())
console.log('Nucleos del CPU: ', os.cpus())
console.log('Memoria RAM Libre: ', os.freemem() / 1024 / 1024, "MB")
console.log('Memoria RAM Total: ', os.totalmem() / 1024 / 1024, "MB")
console.log('Arquitectura del CPU: ', os.machine())
console.log('Nombre de la maquina: ', os.hostname())
console.log(`Este ordenador lleva encendido ${os.uptime / 60 / 60} minutos`)