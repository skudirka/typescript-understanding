(function(){

    const add = (n1:number, n2:number)/* :number */ => {
        return n1 + n2;
    }

    const printResult = (num:number)/* :void */ => {
        console.log('Result ', num);
    }

    const addAndHandle = (n1:number, n2:number, cb:(num:number) => void) => {
        const result = n1 + n2;
        cb(result);
    }

    // function value types
    let combineValues: (a:number, b:number) => number;

    combineValues = add;

    printResult(combineValues(10, 20));

    addAndHandle(20, 20, (val) => {
        console.log('Result', val);
    });

})();