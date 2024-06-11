interface readyData extends pureData {
    charBoard: number[]
}

const reconstruction = (obj: pureData) => {
    const { board, chars, colors } = obj
    console.log('%c chars:', 'background: #ffcc00; color: #003300', chars.length)
    const { canvas, ctx } = core.rebuild

    return new Promise((resolve) => {
        const scale = 5
        const imgWidth = 320 * scale
        const imgHeight = 200 * scale
        canvas.width = imgWidth
        canvas.height = imgHeight

        const drawChar = (char: charT, x: number, y: number) => {
            for (let yy = 0; yy < 8; ++yy) {
                for (let xx = 0; xx < 4; ++xx) {
                    const charPos = (yy * 4) + xx
                    const colorPos = char[charPos]
                    const color = colors[colorPos]

                    ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`

                    const pozX = ((x * 4) + xx) * scale * 2
                    const pozY = ((y * 8) + yy) * scale

                    ctx.fillRect(pozX, pozY, (scale * 2), scale)
                }
            }
        }

        for (let y = 0; y < 25; ++y) {
            for (let x = 0; x < 40; ++x) {
                const boardPoz = (y * 40) + x
                const char = chars[board[boardPoz]]

                drawChar(char, x, y)
            }
        }

        resolve(1)
    })
}