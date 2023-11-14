function characterCount(string, character) {
  return string.split("").filter(char => char === character).length
}

module.exports = characterCount //Exportar funcion characterCount - CommonJS