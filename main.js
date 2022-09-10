const puppeteer = require('puppeteer-extra')
const stealth = require('puppeteer-extra-plugin-stealth')
const Config = requrie('config')
const settings = new Config()

// Platform engine
const {Blogspot} =  require('./platform/blogspot')

puppeteer.use(stealth())

const main = async (text) => {
    const browser = await puppeteer.launch({
        headless: false
    })
    const [page] = await browser.pages()
    await Blogspot({
        page: await page,
        text: await text
    })
}

main('Wiji Fiko Teren')