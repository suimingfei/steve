const kebabCaseToCamelCase = function (kebabCase) {
  return kebabCase.split('-')
    .map((word, index) => (index > 0 ? word[0].toUpperCase() : word[0]) + word.substring(1))
    .join('');
}

module.exports = {
  kebabCaseToCamelCase
}