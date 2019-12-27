interface Named {
    readonly name:string;
    outputName?:string; //optional
}

interface Aged {
    age:number;
}

interface Greetable extends Named {
    greet(phrase:string):void;
}

let user1:Greetable;

user1 = {
    name: 'Steve',
    outputName: 'Kudirka',
    greet(phrase:string){
        console.log(phrase + ' - from user1');
    }
};

user1.greet('There he is!');

class Person implements Greetable, Aged {
    constructor(public readonly name:string, public age:number, public outputName?:string){

    }

    greet(phrase:string){
        console.log(phrase + ' - from '+this.name + ', age:'+this.age);
    }
}

const steve = new Person('Steve', 38);
steve.greet('This guy!');
console.log('Steve', steve);

interface AddFunctionInterface {
    (a:number, b:number):number;
}

let add:AddFunctionInterface;

add = (n1:number, n2:number) => n1 + n2;

console.log('Adding', add(20, 10));