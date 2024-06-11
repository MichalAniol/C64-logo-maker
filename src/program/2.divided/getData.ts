const getData = async () => {
    const { image } = core
    const { canvas, ctx } = core.getData

    const imgWidth = 320
    const imgHeight = 200
    canvas.width = imgWidth
    canvas.height = imgHeight

    image.addEventListener("load", (e) => {
        ctx.drawImage(image, 0, 0, imgWidth, imgHeight)
    })

    return new Promise((resolve) => {
        setTimeout(() => {
            const myImage = ctx.getImageData(0, 0, imgWidth, imgHeight)
            const myImageData = myImage.data

            const colors: [number, number, number][] = []
            if (config.backgroundColor) {
                colors.push(config.backgroundColor)
            }
            const chars: number[][] = []
            const board: number[] = []
            const line = 320 * 4

            const middlePixelY = Math.floor(1 / 2)

            for (let bigY = 0; bigY < 25; ++bigY) {
                for (let bigX = 0; bigX < 40; ++bigX) {
                    const char: number[] = []
                    for (let y = 0; y < 8; ++y) {
                        for (let x = 0; x < 4; ++x) {
                            const yy = ((bigY * 8) + y) * line
                            const xx = ((bigX * 8) + (x * 2)) * 4

                            const poz = 4 + (line * middlePixelY) + yy + xx

                            const color: [number, number, number] = [myImageData[poz], myImageData[poz + 1], myImageData[poz + 2]]

                            myImageData[poz] = 255
                            myImageData[poz + 1] = 255
                            myImageData[poz + 2] = 255

                            const colorIndex = colors.findIndex(c => c[0] === color[0] && c[1] === color[1] && c[2] === color[2])
                            if (colorIndex > -1) {
                                char.push(colorIndex)
                            } else {
                                colors.push(color)
                                char.push(colors.length - 1)
                            }
                        }
                    }
                    const charIndex = chars.findIndex((c) => {
                        for (let i = 0; i < 8 * 4; ++i) {
                            if (c[i] === char[i]) continue
                            return false
                        }
                        return true
                    })
                    if (charIndex > -1) {
                        board.push(charIndex)
                    } else {
                        chars.push(char)
                        board.push(chars.length - 1)
                    }
                }
            }

            // ctx.putImageData(myImage, 0, 0)

            // drawResult(colors, chars, board)

            {
                const { usedColors, chars: charsElem, compressed, percentage } = core.getData

                usedColors.innerHTML = `${colors.length}`
                charsElem.innerHTML = `${chars.length}`

                const colorChars = 1000
                const moreThan256chars = chars.length > 255 ? colorChars + (5 * 25) : 0
                const compressedBytes = (chars.length * 8) + colorChars + moreThan256chars
                compressed.innerHTML = `${compressedBytes} B`

                const percentageValue = (Math.round(((compressedBytes / 9001) * 10000))) / 100
                percentage.innerHTML = `${percentageValue} %`
            }

            resolve({
                colors,
                chars,
                board,
            })
        }, 1000)
    })
}