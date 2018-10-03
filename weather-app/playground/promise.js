// asynchronous function that returns a Promise
var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('arguments must be numbers');
            }
        }, 1500);
    });
};

// calling a async function that returns a Promise
// then (function resolve, function reject)
// catch to capture all rejects in a chaining
asyncAdd(5, 3).then((result) => {
    console.log('1st call result:', result);
    return asyncAdd(result, 10);
}).then((result) => {
    console.log('2nd call result should be 18: ', result);
}).catch((errorMessage) => {
    console.log('error at 1st or 2nd call:', errorMessage);
});

/*
// 1 parameter: function with 2 params: resolve, reject
var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('Hey, it worked');
        reject('Unable to fulfill promise');
    }, 2500);
});

// then: the promise has been fulfilled (function 1st param) or rejected (function 2n param)
somePromise.then((message) => {
    console.log('Success ', message);
}, (errorMessage) => {
    console.log('Error ', errorMessage);
});
*/