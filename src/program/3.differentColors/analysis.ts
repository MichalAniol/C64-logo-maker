type charT = [
    number, number, number, number, number, number, number, number,
    number, number, number, number, number, number, number, number,
    number, number, number, number, number, number, number, number,
    number, number, number, number, number, number, number, number,
]

interface pureData {
    colors: [number, number, number][],
    chars: charT[],
    board: number[]
}

const analysis = (obj: pureData) => {

    const generatePermutations = (arr: number[]) => {
        const results: number[][] = []

        const permute = (currentArray: number[], remainingArray: number[]) => {
            if (remainingArray.length === 0) {
                results.push(currentArray)
            } else {
                for (let i = 0; i < remainingArray.length; i++) {
                    const newCurrentArray = currentArray.concat(remainingArray[i])
                    const newRemainingArray = remainingArray.slice(0, i).concat(remainingArray.slice(i + 1))
                    permute(newCurrentArray, newRemainingArray)
                }
            }
        }

        permute([], arr)

        results.forEach((r) => r.push(0))

        return results
    }

    const removeDuplicatesAndZero = (arr: number[]) => {
        const result = []
        const seen = new Set()

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== 0 && !seen.has(arr[i])) {
                seen.add(arr[i])
                result.push(arr[i])
            }
        }

        return result
    }

    const createSequentialArray = (length: number) => {
        const result = []

        for (let i = 1; i <= length; i++) {
            result.push(i)
        }

        return result
    }


    function replaceElements(arr: number[], order: number[], replacements: number[]) {
        const replacementMap: number[] = [];

        // Tworzenie mapy zamiany na podstawie tablicy kolejności przypisania podmiany i tablicy elementów do zmiany
        for (let i = 0; i < order.length; i++) {
            replacementMap[order[i]] = replacements[i]
        }

        // Tworzenie nowej tablicy, gdzie elementy są zamieniane na podstawie mapy zamiany
        const result = arr.map(element => replacementMap[element] !== undefined ? replacementMap[element] : element);

        return result
    }

    const compareArrays = (arr1: charT, arr2: charT) => {
        for (let i = 0; i < 8; i++) {
            if ((arr1[i] === 0 && arr2[i] !== 0) || (arr1[i] !== 0 && arr2[i] === 0)) {
                return false
            }
        }

        const singleArr1 = removeDuplicatesAndZero(arr1)
        const singleArr2 = removeDuplicatesAndZero(arr2)
        // console.log('%c singleArr:', 'background: #ffcc00; color: #003300', singleArr1, singleArr2)

        if (singleArr1.length !== singleArr2.length) return false

        const normalArr1 = createSequentialArray(singleArr1.length)
        const normalArr2 = createSequentialArray(singleArr2.length)
        // console.log('%c normalArr:', 'background: #ffcc00; color: #003300', normalArr1, normalArr2)

        const permutArr1 = generatePermutations(normalArr1)
        const permutArr2 = generatePermutations(normalArr2)
        // console.log('%c permutArr:', 'background: #ffcc00; color: #003300', permutArr1, permutArr2)

        const testAllArr = (a1: number[], a2: number[]) => {
            // Sprawdzanie, czy pozostałe liczby są ułożone podobnie
            for (let i = 0; i < a1.length; i++) {
                // if (a1[i] !== 0 && a2[i] !== 0 && a1[i] !== a2[i]) {
                if (a1[i] !== a2[i]) {
                    return false
                }
            }
            return true
        }

        const testPermutArr2 = (a1: number[]) => {
            for (let i = 0; i < permutArr2.length; ++i) {
                const a2 = replaceElements(arr2, singleArr2, permutArr2[i])
                const result = testAllArr(a1, a2)
                if (result) return true
            }
            return false
        }

        for (let i = 0; i < permutArr1.length; ++i) {
            const a1 = replaceElements(arr1, singleArr1, permutArr1[i])
            const result = testPermutArr2(a1)
            if (result) return true
        }

        return false
    }

    return new Promise((resolve) => {
        const newChars = [obj.chars[0]]
        const charChanges: [number, number][] = [[0, 0]]

        for (let i = 1; i < obj.chars.length; ++i) {
            // console.log('%c i:', 'background: #ffcc00; color: #003300', i)
            let result = true
            let newCompared = 0
            for (let j = 0; j < newChars.length; ++j) {
                const compare = compareArrays(obj.chars[i], newChars[j])

                if (compare) {
                    result = false
                    newCompared = j
                    break
                }
            }

            if (result) {
                newChars.push(obj.chars[i])
                charChanges.push([i, newChars.length - 1])
            } else {
                charChanges.push([i, newCompared])
            }
        }
        console.log('%c charChanges:', 'background: #ffcc00; color: #003300', charChanges)

        const newBoard: number[] = []
        obj.board.forEach((b, i) => {
            const changeIndex = charChanges.findIndex(c => c[0] === b)
            if (changeIndex > -1) {
                newBoard[i] = charChanges[changeIndex][1]
            } else {
                newBoard[i] = obj.board[i]
            }
        })

        resolve({
            colors: obj.colors,
            chars: newChars,
            board: newBoard
        })
    })

}
