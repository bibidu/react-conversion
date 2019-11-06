import { default as generate } from '@babel/generator'
import * as parser from '@babel/parser'

export function ast2code(ast) {
  const code = generate(ast, {}).code
  return code
}
export function code2ast(code) {
  console.log('code')
  console.log(code)
  const ast = parser.parse(code)
  return ast
}