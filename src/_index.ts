

(function () {

    getStorage().then((store) => {
        core.store = store

        setConsole()


        getData().then((obj: pureData) => {
            analysis(obj).then((obj: pureData) => {
                console.log('%c obj:', 'background: #ffcc00; color: #003300', obj)
                reconstruction(obj).then(() => {

                })
            })
        })
    })
}())
