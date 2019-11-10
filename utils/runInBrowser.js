require('babel-polyfill');
const path = require('path');
const puppeteer = require('puppeteer');

module.exports = async function runInBrowser({ html, script }) {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false
  })
  const page = await browser.newPage()
  await page.goto('file:' + path.join(process.cwd(), 'index.html'))

  const renderHtml = () => {
    const baseHTML = `
      const result = document.createElement('div')
      result.id = 'result'
      document.body.appendChild(result)`
    if (html) {
      return `${baseHTML};document.body.innerHTML += \`${html}\``
    }
    return baseHTML
  }

  await page.addScriptTag({
    content: `
    ${renderHtml()}
    ${script}`
  })
  
  await page.waitForSelector('#result')
  const handle = await page.evaluateHandle(() => document.querySelector('#result'));
  const resultHandle = await page.evaluateHandle(result => result.innerText, handle);
  const result = await resultHandle.jsonValue()
  await browser.close()

  return JSON.parse(result)
}