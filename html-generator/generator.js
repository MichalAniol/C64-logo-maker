const oof = require('./operationsOnFiles')
const cheerio = require('cheerio')

const start = () => {
    const aggregateFiles = (path, $) => {
        // console.log('%c _____________path:', 'background: #ffcc00; color: #003300', path)
        const fileElement = $('file')
        let folder = ''
        if (fileElement.length > -1) {
            fileElement.each((index, element) => {
                const src = element.attribs.src

                if (src) {
                    const file = oof.load(`${path}\\${src}`)
                    if (file) {
                        const splitted = src.split('/')
                        splitted.pop()

                        folder = ''
                        for (let i = 0; i < splitted.length; ++i) {
                            folder += `${splitted[i]}${i < splitted.length - 1 ? '\\' : ''}`
                        }

                        const newCode = file.toString()
                        if (folder.length > 0) {
                            const code = aggregateFiles(`${path}\\${folder}`, cheerio.load(newCode))
                            $(element).replaceWith(code.html())
                        } else {
                            $(element).replaceWith(newCode)
                        }
                    } else {
                        console.error(`>>>>>>>>>>Błędny "src" do pliku: ${path}\\${src}`)
                    }
                    console.log(`  >> added file: ${path}\\${src.replace(/\//g, '\\')}`, index + 1, fileElement.length)
                } else {
                    console.error(`Brakuje "src" w pliku: ${path}\\${src}`)
                }
            })
            console.log('-----------------------')
        }

        return $
    }

    const aggregateCss = (path, $) => {
        const fileElement = $('link')

        let css = ''
        fileElement.each((index, element) => {
            const href = element.attribs.href

            if (href) {
                const file = oof.load(`${path}\\${href}`)
                if (file) {
                    const splitted = href.split('/')
                    splitted.pop()

                    folder = ''
                    for (let i = 0; i < splitted.length; ++i) {
                        folder += `${splitted[i]}${i < splitted.length - 1 ? '\\' : ''}`
                    }

                    css += file.toString()
                    $(element).replaceWith('')
                } else {
                    console.error(`>>>>>>>>>>Błędny "href" do pliku: ${path}\\${href}`)
                }
                console.log(`  >> added file: ${path}\\${href.replace(/\//g, '\\')}`, index + 1, fileElement.length)
            } else {
                console.error(`Brakuje "src" w pliku: ${path}\\${href}`)
            }

        })

        // <link rel='stylesheet' type='text/css' href='./css/index.css'>
        const metaTag = $('<link>').attr('rel', 'stylesheet').attr('type', 'text/css').attr('href', './index.css')
        $('head').append(metaTag)

        oof.save('prod/index.css', css)

    }

    const pathFile = 'src\\_index.html'
    const file = oof.load(pathFile)
    const $ = cheerio.load(file)

    aggregateFiles('src', $)
    aggregateCss('src', $)

    oof.save('prod/index.html', $.html())
    console.log(`Saved!!! file: ${pathFile}`)
}

module.exports = { start }