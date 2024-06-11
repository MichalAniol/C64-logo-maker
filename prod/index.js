const setConsole = () => (function () {
    let styles = [
        'background: linear-gradient(169deg, #f60707 0%, #ffd600 38%, #edff00 51%, #c4ed18 62%, #00ff19 100%)',
        'border: 1px solid #3E0E02',
        'width: 220px',
        'color: black',
        'display: block',
        'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
        'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
        'line-height: 30px',
        'text-align: center',
        'font-weight: bold',
        'font-size: 24px',
        'margin: 10px 0',
        'padding: 10px 0 15px 0'
    ].join(';');
    console.log('%c👉👈', styles);
    let styles2 = [
        'background: linear-gradient(169deg, #f60707 0%, #ffd600 38%, #edff00 51%, #c4ed18 62%, #00ff19 100%)',
        'border: 1px solid #3E0E02',
        'width: 220px',
        'color: black',
        'display: block',
        'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
        'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
        'line-height: 18px',
        'text-align: center',
        'font-weight: bold',
        'font-size: 16px',
        'margin: 10px 0',
        'padding: 10px 0 15px 0'
    ].join(';');
    console.log('%c   𝒂𝒖𝒕𝒐𝒓: 𝐌𝐢𝐜𝐡𝐚𝐥 𝐀𝐧𝐢𝐨𝐥 😎   ', styles2);
}());
const checked = {
    yes: 'yes',
    no: 'no',
};
const getStorage = async () => {
    const names = {
        test: 'test',
    };
    const defaultData = {
        test: 'test-test',
    };
    const isValidJSONStringify = (str) => {
        try {
            JSON.stringify(str);
            return true;
        }
        catch {
            return false;
        }
    };
    const set = (key, value) => {
        if (isValidJSONStringify(value)) {
            localStorage.setItem(key, JSON.stringify(value));
        }
        else {
            localStorage.setItem(key, value.toString());
        }
    };
    const isValidJSONParse = (str) => {
        try {
            JSON.stringify(str);
            return true;
        }
        catch {
            return false;
        }
    };
    const get = (key) => {
        const value = localStorage.getItem(key);
        if (!value)
            return null;
        if (typeof value === 'boolean')
            return `${value}`;
        if (isValidJSONParse(value)) {
            return JSON.parse(value);
        }
        else {
            return value.toString();
        }
    };
    const initData = () => {
        const list = Object.keys(names);
        list.forEach((k) => {
            const data = get(k);
            if (!data && defaultData[k])
                set(k, defaultData[k]);
        });
    };
    initData();
    return {
        names,
        set,
        get,
    };
};
const dom = (function () {
    const byId = (name) => document.getElementById(name);
    const byQuery = (query) => document.querySelector(query);
    const byQueryAll = (query) => document.querySelectorAll(query);
    const byQ = (elem, query) => elem.querySelector(query);
    const byQAll = (elem, query) => elem.querySelectorAll(query);
    const setStyle = (element, style, value) => element.style[style] = value;
    const setAllStyles = (styles) => styles.forEach((s) => setStyle(s[0], s[1], s[2]));
    const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);
    const setAllAttributes = (attributes) => attributes.forEach((a) => a[0].setAttribute(a[1], a[2]));
    const disable = (elem) => elem.setAttribute('disabled', '');
    const enable = (elem) => elem.removeAttribute('disabled');
    const check = (elem) => elem.checked = true;
    const uncheck = (elem) => elem.checked = false;
    const display = (elem, attribute) => elem.style.display = attribute;
    const setColor = (elem, color) => elem.style.color = color;
    const removeClass = (elem, attribute) => elem.classList.remove(attribute);
    const addClass = (elem, attribute) => elem.classList.add(attribute);
    const colors = {
        line: 'var(--line_color)',
        prime: 'var(--prime_color)',
        off1: 'var(--off_prime_color)',
        off2: 'var(--off_second_color)',
    };
    const add = (elem, name, fn) => elem.addEventListener(name, fn);
    const xmlns = 'http://www.w3.org/2000/svg';
    const newNS = (name) => document.createElementNS(xmlns, 'rect');
    return {
        byId,
        byQuery,
        byQueryAll,
        byQ,
        byQAll,
        setStyle,
        setAllStyles,
        setAttribute,
        setAllAttributes,
        disable,
        enable,
        check,
        uncheck,
        display,
        setColor,
        removeClass,
        addClass,
        colors,
        add,
        newNS,
    };
}());
const config = (function () {
    return {
        backgroundColor: [0, 0, 0],
        colors: {
            a: [120, 105, 196],
            b: [191, 206, 114],
            c: [64, 49, 141],
            d: [0, 0, 0],
            e: [85, 160, 73],
            f: [184, 105, 98],
            g: [139, 84, 41],
            h: [139, 63, 150],
            i: [159, 159, 159],
            j: [120, 120, 120],
            k: [80, 80, 80],
            l: [87, 66, 0],
        }
    };
}());
const getCore = () => {
    const result = {
        store: null,
        image: document.getElementById("origin-img"),
        getData: {
            canvas: document.getElementById('canvas'),
            ctx: null,
            usedColors: document.getElementById('used-colors'),
            chars: document.getElementById('chars'),
            compressed: document.getElementById('bytes-compressed'),
            percentage: document.getElementById('percentage-of-compression'),
        },
        rebuild: {
            canvas: document.getElementById('canvas-result'),
            ctx: null
        },
    };
    result.getData.ctx = result.getData.canvas.getContext("2d");
    result.rebuild.ctx = result.rebuild.canvas.getContext("2d");
    return result;
};
const core = getCore();
const getData = async () => {
    const { image } = core;
    const { canvas, ctx } = core.getData;
    const imgWidth = 320;
    const imgHeight = 200;
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    image.addEventListener("load", (e) => {
        ctx.drawImage(image, 0, 0, imgWidth, imgHeight);
    });
    return new Promise((resolve) => {
        setTimeout(() => {
            const myImage = ctx.getImageData(0, 0, imgWidth, imgHeight);
            const myImageData = myImage.data;
            const colors = [];
            if (config.backgroundColor) {
                colors.push(config.backgroundColor);
            }
            const chars = [];
            const board = [];
            const line = 320 * 4;
            const middlePixelY = Math.floor(1 / 2);
            for (let bigY = 0; bigY < 25; ++bigY) {
                for (let bigX = 0; bigX < 40; ++bigX) {
                    const char = [];
                    for (let y = 0; y < 8; ++y) {
                        for (let x = 0; x < 4; ++x) {
                            const yy = ((bigY * 8) + y) * line;
                            const xx = ((bigX * 8) + (x * 2)) * 4;
                            const poz = 4 + (line * middlePixelY) + yy + xx;
                            const color = [myImageData[poz], myImageData[poz + 1], myImageData[poz + 2]];
                            myImageData[poz] = 255;
                            myImageData[poz + 1] = 255;
                            myImageData[poz + 2] = 255;
                            const colorIndex = colors.findIndex(c => c[0] === color[0] && c[1] === color[1] && c[2] === color[2]);
                            if (colorIndex > -1) {
                                char.push(colorIndex);
                            }
                            else {
                                colors.push(color);
                                char.push(colors.length - 1);
                            }
                        }
                    }
                    const charIndex = chars.findIndex((c) => {
                        for (let i = 0; i < 8 * 4; ++i) {
                            if (c[i] === char[i])
                                continue;
                            return false;
                        }
                        return true;
                    });
                    if (charIndex > -1) {
                        board.push(charIndex);
                    }
                    else {
                        chars.push(char);
                        board.push(chars.length - 1);
                    }
                }
            }
            {
                const { usedColors, chars: charsElem, compressed, percentage } = core.getData;
                usedColors.innerHTML = `${colors.length}`;
                charsElem.innerHTML = `${chars.length}`;
                const colorChars = 1000;
                const moreThan256chars = chars.length > 255 ? colorChars + (5 * 25) : 0;
                const compressedBytes = (chars.length * 8) + colorChars + moreThan256chars;
                compressed.innerHTML = `${compressedBytes} B`;
                const percentageValue = (Math.round(((compressedBytes / 9001) * 10000))) / 100;
                percentage.innerHTML = `${percentageValue} %`;
            }
            resolve({
                colors,
                chars,
                board,
            });
        }, 1000);
    });
};
const analysis = (obj) => {
    const generatePermutations = (arr) => {
        const results = [];
        const permute = (currentArray, remainingArray) => {
            if (remainingArray.length === 0) {
                results.push(currentArray);
            }
            else {
                for (let i = 0; i < remainingArray.length; i++) {
                    const newCurrentArray = currentArray.concat(remainingArray[i]);
                    const newRemainingArray = remainingArray.slice(0, i).concat(remainingArray.slice(i + 1));
                    permute(newCurrentArray, newRemainingArray);
                }
            }
        };
        permute([], arr);
        results.forEach((r) => r.push(0));
        return results;
    };
    const removeDuplicatesAndZero = (arr) => {
        const result = [];
        const seen = new Set();
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== 0 && !seen.has(arr[i])) {
                seen.add(arr[i]);
                result.push(arr[i]);
            }
        }
        return result;
    };
    const createSequentialArray = (length) => {
        const result = [];
        for (let i = 1; i <= length; i++) {
            result.push(i);
        }
        return result;
    };
    function replaceElements(arr, order, replacements) {
        const replacementMap = [];
        for (let i = 0; i < order.length; i++) {
            replacementMap[order[i]] = replacements[i];
        }
        const result = arr.map(element => replacementMap[element] !== undefined ? replacementMap[element] : element);
        return result;
    }
    const compareArrays = (arr1, arr2) => {
        for (let i = 0; i < 8; i++) {
            if ((arr1[i] === 0 && arr2[i] !== 0) || (arr1[i] !== 0 && arr2[i] === 0)) {
                return false;
            }
        }
        const singleArr1 = removeDuplicatesAndZero(arr1);
        const singleArr2 = removeDuplicatesAndZero(arr2);
        if (singleArr1.length !== singleArr2.length)
            return false;
        const normalArr1 = createSequentialArray(singleArr1.length);
        const normalArr2 = createSequentialArray(singleArr2.length);
        const permutArr1 = generatePermutations(normalArr1);
        const permutArr2 = generatePermutations(normalArr2);
        const testAllArr = (a1, a2) => {
            for (let i = 0; i < a1.length; i++) {
                if (a1[i] !== a2[i]) {
                    return false;
                }
            }
            return true;
        };
        const testPermutArr2 = (a1) => {
            for (let i = 0; i < permutArr2.length; ++i) {
                const a2 = replaceElements(arr2, singleArr2, permutArr2[i]);
                const result = testAllArr(a1, a2);
                if (result)
                    return true;
            }
            return false;
        };
        for (let i = 0; i < permutArr1.length; ++i) {
            const a1 = replaceElements(arr1, singleArr1, permutArr1[i]);
            const result = testPermutArr2(a1);
            if (result)
                return true;
        }
        return false;
    };
    return new Promise((resolve) => {
        const newChars = [obj.chars[0]];
        const charChanges = [[0, 0]];
        for (let i = 1; i < obj.chars.length; ++i) {
            let result = true;
            let newCompared = 0;
            for (let j = 0; j < newChars.length; ++j) {
                const compare = compareArrays(obj.chars[i], newChars[j]);
                if (compare) {
                    result = false;
                    newCompared = j;
                    break;
                }
            }
            if (result) {
                newChars.push(obj.chars[i]);
                charChanges.push([i, newChars.length - 1]);
            }
            else {
                charChanges.push([i, newCompared]);
            }
        }
        console.log('%c charChanges:', 'background: #ffcc00; color: #003300', charChanges);
        const newBoard = [];
        obj.board.forEach((b, i) => {
            const changeIndex = charChanges.findIndex(c => c[0] === b);
            if (changeIndex > -1) {
                newBoard[i] = charChanges[changeIndex][1];
            }
            else {
                newBoard[i] = obj.board[i];
            }
        });
        resolve({
            colors: obj.colors,
            chars: newChars,
            board: newBoard
        });
    });
};
const reconstruction = (obj) => {
    const { board, chars, colors } = obj;
    console.log('%c chars:', 'background: #ffcc00; color: #003300', chars.length);
    const { canvas, ctx } = core.rebuild;
    return new Promise((resolve) => {
        const scale = 5;
        const imgWidth = 320 * scale;
        const imgHeight = 200 * scale;
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        const drawChar = (char, x, y) => {
            for (let yy = 0; yy < 8; ++yy) {
                for (let xx = 0; xx < 4; ++xx) {
                    const charPos = (yy * 4) + xx;
                    const colorPos = char[charPos];
                    const color = colors[colorPos];
                    ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                    const pozX = ((x * 4) + xx) * scale * 2;
                    const pozY = ((y * 8) + yy) * scale;
                    ctx.fillRect(pozX, pozY, (scale * 2), scale);
                }
            }
        };
        for (let y = 0; y < 25; ++y) {
            for (let x = 0; x < 40; ++x) {
                const boardPoz = (y * 40) + x;
                const char = chars[board[boardPoz]];
                drawChar(char, x, y);
            }
        }
        resolve(1);
    });
};
(function () {
    getStorage().then((store) => {
        core.store = store;
        setConsole();
        getData().then((obj) => {
            analysis(obj).then((obj) => {
                console.log('%c obj:', 'background: #ffcc00; color: #003300', obj);
                reconstruction(obj).then(() => {
                });
            });
        });
    });
}());
