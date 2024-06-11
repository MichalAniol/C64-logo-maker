const cheerio = require('cheerio')
const oof = require('./operationsOnFiles')

const filePath = 'interface/index.html'

const change = () => {

    const data = oof.load(filePath)
    if (data) {
        const $ = cheerio.load(data)

        $('script[src]').each((index, element) => {
            if (element.attribs.src[0] === '/') $(element).attr('src', `.${element.attribs.src}`);
        })

        $('link[href]').each((index, element) => {
            if (element.attribs.href[0] === '/') $(element).attr('href', `.${element.attribs.href}`);
        })

        oof.save(filePath, $.html())
    }
}

module.exports = { change }