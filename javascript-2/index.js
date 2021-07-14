let fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
}

let fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
})

function promiseReduce(asyncFunctions, reduce, initialValue) { 
    let promise = Promise.resolve(initialValue);
    asyncFunctions.forEach((fn) => {
        promise = promise.then(
            async (_initVal) => {
                let res = await fn();
                return reduce(_initVal, res);
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