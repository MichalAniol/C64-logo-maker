type CoreT = {
    store: Awaited<ReturnType<typeof getStorage>> | null,
    image: HTMLImageElement | null,
    getData: {
        canvas: HTMLCanvasElement | null,
        ctx: CanvasRenderingContext2D | null,
        usedColors: HTMLElement | null,
        chars: HTMLElement | null,
        compressed: HTMLElement | null,
        percentage: HTMLElement | null,
    },
    rebuild: {
        canvas: HTMLCanvasElement | null,
        ctx: CanvasRenderingContext2D | null,
    },
}

const getCore = () => {
    const result: CoreT = {
        store: null,
        image: document.getElementById("origin-img") as HTMLImageElement,
        getData: {
            canvas: document.getElementById('canvas') as HTMLCanvasElement,
            ctx: null,
            usedColors: document.getElementById('used-colors'),
            chars: document.getElementById('chars'),
            compressed: document.getElementById('bytes-compressed'),
            percentage: document.getElementById('percentage-of-compression'),
        },
        rebuild: {
            canvas: document.getElementById('canvas-result') as HTMLCanvasElement,
            ctx: null
        },
    }

    result.getData.ctx = result.getData.canvas.getContext("2d")
    result.rebuild.ctx = result.rebuild.canvas.getContext("2d")

    return result
}

const core = getCore()