var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
})

function promiseReduce(asyncFunctions, reduce, initialValue) { 
    let promise = Promise.resolve(initialValue);
    asyncFunctions.forEach((fn) => {
        promise = promise.then(
            async () => {
                let res = await fn();
                return reduce(1, res);
            })
    })
    return promise;
}

promiseReduce(
    [fn1, fn2], 
    function (memo, value) {
        console.log('reduce')
        return memo * value
    }, 
    1
)
.then(console.log) 