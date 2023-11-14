function getWordFromString (string) {
  return string.split(" ").at(-1)
}

module.exports = { getWordFromString }