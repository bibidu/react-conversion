const w = require('./walker')
const {
  ast2code,
} = require('../../utils')

module.exports = {
  Program(path) {
    w.walkProgram(path)
  }
}