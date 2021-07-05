const testController = {};

testController.test = () => {
    try {
        const a1 = [6, 5, 4, 3, 2, 1];
        const a2 = ['mood', 'mashood', 'aam', 'zinger', 'icecream'];
        const a3 = [1, 2, 3];

        const mapped = a1.map((element) => element * 2);
        const filtered = a1.filter((element) => element % 2 == 0);
        const sorted = a1.sort((a, b) => (a > b ? 1 : -1));
        const sortedString = a2.sort((a, b) => (a > b ? 1 : -1));
        const removedDuplicated = [...new Set([...a1, ...a3])];
        const everyIsEven = a1.some((element) => element % 2 == 0);
        const includes = a1.includes(16);
        const someString = 'm~a~s~h~o~o~d';
        const splitted = someString.split('~');

        // const mapped = a1.map((element) => element + 2);
        // const filtered = a1.filter((element) => element == 2 || element == 4);
        // const sortedASC = a1.sort((a, b) => (a > b ? 1 : -1));
        // const alphaSorted = a2.sort((a, b) => (a > b ? 1 : -1));
        // const removeMergedDuplicated = [...new Set([...a1, ...a3])];
        // const every = a1.every((element) => element > 0);
        // const some = a1.some((element) => element > 1);
        // const includes = a1.includes(100);
        // const someString = 'm~a~s~h~o~o~d';
        // const broke = someString.split('~');
        // const find = a2.find((element) => element == 'mashood');
        // const findIndex = a2.findIndex((element) => element == 'mashood');
        // const sliced = a2.slice(1, 3);
        // const reversed = a1.reverse();

        // const newArray = [1, 2, 3, 4, 5];
        // //Pushed element to end of array
        // const pushedArray = newArray.push(6);

        // //Pop removes element from end of array and returns that element.
        // const poppedarray = newArray.pop();

        // const eeeArray = [1, 2, 3, 4, 5];
        // //Remove from start of array
        // eeeArray.shift();
        // //Add to start of array
        // eeeArray.unshift(1);
    } catch (error) {
        console.log(error);
    }

    // var promise = new Promise(function(resolve, reject) {
    //     setTimeout(function() {
    //         resolve('hello world');
    //     }, 2000);
    // });
    // promise.then(function(data) {
    //     console.log(data);
    // });

    // const promise = new Promise((resolve, reject) => {
    //     reject('Rejected.');
    // });
    // promise
    //     .then((data) => {
    //         console.log('In then.');
    //         console.log(data);
    //     })
    //     .catch((error) => {
    //         console.log('In catch.');
    //         console.log(error);
    //     });

    //Resolve promise after 2 secomds
    // const promise = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve('Resolved baby.');
    //     }, 2000);
    // });
    // promise.then((data) => {
    //     console.log(data);
    // });
    // const number = 1;
    // const promise = testController.findNumberType(number);
    // promise
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // var promise = job1();

    // promise
    //     .then(function(data1) {
    //         console.log('data1', data1);
    //         return job2();
    //     })
    //     .then(function(data2) {
    //         console.log('data2', data2);
    //         return 'Hello world';
    //     })
    //     .then(function(data3) {
    //         console.log('data3', data3);
    //     });
    //data1 result of job 1
    //data2 result of job 2
    //Hello world
    // let promise = job(true);
    // promise
    // .then(function(data) {
    //     console.log(data);
    //     return job(true);
    // })
    // .then(function(data) {
    //     if (data !== 'victory') {
    //         throw 'Defeat';
    //     }
    //     return job(true);
    // })
    // .then(function(data) {
    //     console.log(data);
    // })
    // .catch(function(error) {
    //     console.log(error);
    //     return job(false);
    // })
    // .then(function(data) {
    //     console.log(data);
    //     return job(true);
    // })
    // .catch(function(error) {
    //     console.log(error);
    //     return 'Error caught';
    // })
    // .then(function(data) {
    //     console.log(data);
    //     return new Error('test');
    // })
    // .then(function(data) {
    //     console.log('Success:', data.message);
    // })
    // .catch(function(data) {
    //     console.log('Error:', data.message);
    // });

    //To keep iterating
    // let iterator = 0;
    // let intervalId = setInterval(() => {
    //     console.log('In set interval.');
    //     if (iterator == 2) {
    //         console.log('In clear interval');
    //         clearInterval(intervalId);
    //     }
    //     iterator += 1;
    // }, 500);

    // setTimeout(() => console.log('timeout'), 0);
    // setImmediate(() => console.log('immediate'));
    // process.nextTick(() => console.log('nextTick'));
    // console.log('current event loop');
    // console.log('-----------');
    // racer1();
    // console.log('-----------');
    // racer2();
    // console.log('-----------');
    // racer3();
    // console.log('-----------');

    // const array1 = { mashood: 6, saad: 7, rohaan: 8 };
    // const array2 = ['mashood', 'rohaan'];
    // for (let key in array1) {
    //     let hmm = array2.findIndex((element) => element == key);
    //     if (hmm != -1) {
    //         console.log(key + ' is present.');
    //         console.log(array1[key]);
    //     }
    //     // console.log(key);
    //     // var value = array1[key];
    //     // console.log(key, array1[key]);
    // }
};
let racer1 = function() {
    setTimeout(() => console.log('timeout'), 0);
    setImmediate(() => console.log('immediate'));
    process.nextTick(() => console.log('nextTick'));
};

let racer2 = function() {
    process.nextTick(() => console.log('nextTick'));
    setTimeout(() => console.log('timeout'), 0);
    setImmediate(() => console.log('immediate'));
};

let racer3 = function() {
    setImmediate(() => console.log('immediate'));
    process.nextTick(() => console.log('nextTick'));
    setTimeout(() => console.log('timeout'), 0);
};
function job(state) {
    return new Promise(function(resolve, reject) {
        if (state) {
            resolve('success');
        } else {
            reject('error');
        }
    });
}
// function job1() {
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             resolve('result of job 1');
//         }, 1000);
//     });
// }
// function job2() {
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             resolve('result of job 2');
//         }, 1000);
//     });
// }

testController.findNumberType = (number) => {
    console.log(number);
    try {
        if (isNaN(number)) reject('error');
        const promise = new Promise((resolve, reject) => {
            const isEven = number % 2 == 0;
            if (isEven) {
                setTimeout(() => {
                    reject('even');
                }, 2000);
            } else {
                setTimeout(() => {
                    resolve('odd');
                }, 1000);
            }
        });
        return promise;
    } catch (error) {
        console.log(error);
    }
};
export default testController;
