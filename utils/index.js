module.exports.isComponentName = (name) => {
  const firstChar = name.slice(0, 1)
  return /[a-zA-Z]/.test(firstChar) && firstChar === firstChar.toUpperCase()
}

