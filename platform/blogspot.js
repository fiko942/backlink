const { Browser } = require("puppeteer")

module.exports.Blogspot = async (props) => {
    const settings = await props.settings
    const elements = {
        new_post: '#gb > div.gb_Ic.gb_Fc.gb_Lc.gb_Mc.gb_ka > div.gb_Nc > div > c-wiz > div.kiQDlf > div > div > span > span > span.MIJMVe',
        input_title: '#yDmH0d > c-wiz:nth-child(16) > div > c-wiz > div > div.LYkI7 > div.rFrNMe.rzHh9c.l8Ahzd.zKHdkd.sdJrJc > div.aCsJod.oJeWuf > div > div.Xb9hP > input',
        input_body: 'body body',
        publish_submit: '#yDmH0d > c-wiz:nth-child(16) > div > c-wiz > div > div.LYkI7 > div.vAOvBb > div.U26fgb.O0WRkf.zZhnYe.e3Duub.C0oVfc.jPVgtf.iRR07e.M9Bg4d > span',
        confirm_publish: '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.OFqiSb.Up8vH.J9Nfi.iWO5td > div.XfpsVe.J9fJmf > div.U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.kHssdc.HvOprf.M9Bg4d > span > span'

    }
    const page = await props.page
    await page.setCookie(...settings.get('BLOGSPOT_SESSION'))
    await page.goto('https://blogspot.com', { timeout: 0, waitUntil: 'networkidle2' })
    await page.waitForSelector(elements.new_post, { timeout: 0 })
    await page.click(elements.new_post)
    await page.waitForSelector(elements.input_title, { timeout: 0, visible: true, hidden: false })
    const title = await props.generateTitle(props.text)
    await page.type(elements.input_title, title)
    // await page.waitForSelector(elements.input_body, { timeout: 0, visible: false})
    await page.click(elements.input_body)
    for (let i = 0; i < props.text; i++) {
        await page.keyboard.press(elements.input_body, props.text[i])
    }
    await page.waitForSelector(elements.publish_submit, { timeout: 0 })
    await page.click(elements.publish_submit)
    await page.waitForSelector(elements.confirm_publish, { timeout: 0, visible: true })
    await page.click(elements.publish_submit)
    return
}


module.exports.Login = async (props) => {
    const elements = {
        picture_image: '#gb > div.gb_Ld.gb_2d.gb_Rd > div.gb_Vd.gb_Xa.gb_Kd > div.gb_Re > div.gb_Ma.gb_gd.gb_lg.gb_f.gb_zf > div > a > img'
    }
    const browser = await props.browser
    // const browser = await props.browser
    const page = await props.page
    await page.goto('https://www.blogger.com/go/signin', { timeout: 0, waitUntil: 'domcontentloaded' })
    await page.waitForSelector(elements.picture_image, { timeout: 0 })
    const settings = await props.settings
    settings.set('BLOGSPOT_SESSION', await page.cookies())
    await browser.close()
    console.log('Session has been saved successfully')
    return
}