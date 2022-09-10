const puppeteer = require('puppeteer-extra')
const stealth = require('puppeteer-extra-plugin-stealth')
const config = require('conf')
const settings = new config()

// Platform engine
const {Blogspot} =  require('./platform/blogspot')

puppeteer.use(stealth())

const main = async (text) => {
    const browser = await puppeteer.launch({
        headless: false
    })
    const [page] = await browser.pages()
    await page.setRequestInterception(true)
    page.on('request', (req) => {
        const blockedReq = ['image', 'font', 'stylesheet']
        if (blockedReq.indexOf(req.resourceType().toLowerCase()) >= 0) {
            req.abort()
        } else {
            req.continue()
        }
    })
    await Blogspot({
        page: await page,
        text: await text,
        browser: await browser,
        settings: settings,
        generateTitle
    })
}

const generateTitle = (text) => {
    const maxlength = 15
    if (text >= maxlength) {
        let t = ''
        for (let i = 0; i <= maxlength; i++) {
            t += text[i]
        }
        return `${t} #${randomString({length: 5})}`
    } else {
        return `${text} #${randomString({length: 5})}`
    }
}

const randomString = (props) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let c = ''
    for (let i = 0; i < props.length; i++) {
        c+=[Math.floor(Math.random() * chars.length)]
    }
    return c
}

main('Wiji Fiko Teren')