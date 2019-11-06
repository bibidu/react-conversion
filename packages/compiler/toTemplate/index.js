import toVueTemplate from './toVueTemplate'

const tabSize = '  '

export default function toTemplate(target, jsxTree, index = 0) {
  if (target === 'vue') {
    console.log('=============================')
    console.log('========== jsxTree ===========')
    return toVueTemplate(tabSize, jsxTree, index)
  }
}
