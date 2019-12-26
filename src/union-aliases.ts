(function(){

    type Combinable = number | string;
    type CombineResultType = 'as-number' | 'as-string';

    const combine = (input1:Combinable, input2:Combinable, resultType:CombineResultType) => {
        let result;
        if(typeof input1 === 'number' && typeof input2 === 'number' || resultType==='as-number'){
            result = +input1 + +input2;
        } else {
            result = input1.toString() + input2.toString();
        }
        return result;
    }

    const combinedAges = combine(46, 26, 'as-string');
    console.log('combinedAges', combinedAges);

})();