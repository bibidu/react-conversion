require('babel-polyfill');
const path = require('path');

const devices = require('puppeteer/DeviceDescriptors');

const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({

        headless: false,
        devtools: true

    })

    const page = await browser.newPage()

    await page.emulate(devices['iPhone X'])
// console.log(path.join(__dirname, 'index.html'))
    await page.goto('file:' + path.join(__dirname, 'index.html'))

  // const res = await page.addScriptTag({
  //   content: 'function add() {return 2}'
  // })
  // console.log('res')
  // console.log(await res.$('body'))
  const bodyHandle = await page.$('body');
  const html = await page.evaluate(body => body.innerHTML, bodyHandle);
  console.log(html)
})()
