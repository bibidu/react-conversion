import t from '@babel/types'
import mainVisitor from './MainVisitor'
import { ast2code } from '../compile/utils'
import LogicalVisitor from './LogicalVisitor'

export default [
  LogicalVisitor,
  mainVisitor
]