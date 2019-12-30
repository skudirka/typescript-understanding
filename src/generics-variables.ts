// Generics
const names:Array<string> = []; // string[]

const promise:Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});

promise.then(data => {
    data.split(' '); // ts knows it will be a string
});