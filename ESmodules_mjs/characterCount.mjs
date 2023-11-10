export default function characterCount(string, character) {
  return string.split("").filter(char => char === character).length
}