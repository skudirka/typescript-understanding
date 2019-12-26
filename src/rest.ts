(function(){

    // using rest parameters
    const add = (...numbers:number[]) => numbers.reduce((acc, val) => acc + val, 0);

    const addedNumbers = add(5, 10, 2, 3.7);
    console.log('addedNumbers', addedNumbers);

})();