const add = (n1:number, n2:number, showResult:boolean, phrase:string) => {
    const answer = n1 + n2;
    if( showResult ){
        console.log(phrase + answer);
    } else{
        return answer;
    }
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is ';

const result  = add(+number1, +number2, printResult, resultPhrase);