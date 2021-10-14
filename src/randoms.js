process.on("message", cant => {
    const result = {}
    for(let i = 0; i < cant; i++) {
        const min = 1
        const max = 2000
        const random = Math.floor(Math.random() * (max - min) + min)
        if(result.hasOwnProperty(random)) {
            result[random] = result[random] + 1
        }
        else {
            result[random] = 1
        }
    }
    process.send(result)
})