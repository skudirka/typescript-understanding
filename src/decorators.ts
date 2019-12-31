// Decorator
/*function Logger(constructor:Function) {
    console.log('Logging...');
    console.log(constructor);
}
@Logger
*/

// Factory Decorator
function Logger(logString:string) {
    console.log('LOGGER FACTORY');
    return function(constructor:Function){
        console.log(logString);
        console.log(constructor);
    }
}
/* @Logger('LOGGIN PERSON') */

/*function WithTemplate(template:string, hookId:string){
    console.log('TEMPALTE FACTORY');
    return function(constructor:any){
        const p = new constructor();
        const hookEl = document.getElementById(hookId);
        if(hookEl){
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}*/
function WithTemplate(template:string, hookId:string){
    console.log('TEMPALTE FACTORY');
    return function<T extends {new (...args:any[]):{name:string}}>(originalConstructor:T){
        return class extends originalConstructor {
            constructor(..._:any[]) {
                super();
                console.log("Rendering template");
                const hookEl = document.getElementById(hookId);
                if(hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}


@Logger('Logging')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class DecPerson {
    name = 'Steve';

    constructor(){
        console.log('Creating person class...');
    }
}

const pers = new DecPerson();

console.log('Person', pers);


function Log(target:any, propertyName:string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

function Log2(target:any, name:string, descriptor:PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('descriptor', descriptor);
}

function Log3(target:any, name:string | Symbol, descriptor:PropertyDescriptor) {
    console.log('Method decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('descriptor', descriptor);
}

function Log4(target:any, name:string | Symbol, position:number) {
    console.log('Parameter decorator!');
    console.log('target', target);
    console.log('method name', name);
    console.log('position', position);
}
class Product {
    @Log
    title:string;
    private _price:number;

    constructor(t:string, p:number){
        this.title = t;
        this._price = p;
    }

    @Log2
    set price(val:number){
        if(val>0){
            this._price = val;
        } else {
            throw new Error('Invalid price, should be positive.');
        }
    }

    @Log3
    getPriceWithTax(@Log4 tax:number){
        return this._price * (1 + tax);
    }
}

// Auto-bind decorator
function AutoBind(_:any, _2:string | Symbol, descriptor:PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor:PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}

const printer = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', printer.showMessage);


// Validator Decorator
interface ValidatorConfig {
    [property:string]: {
        [validatableProp:string]: string[] // ['required', 'positive']
    }
}

const registeredValidators:ValidatorConfig = {};

function Required(target:any, propName:string){
    const validators = registeredValidators[target.constructor.name] || {};
    const propValidators = validators[propName] || [];
    registeredValidators[target.constructor.name] = {
        ...validators,
        [propName]: [
            ...propValidators,
            'required'
        ]
    };
}
function PositiveNumber(target:any, propName:string){
    const validators = registeredValidators[target.constructor.name] || {};
    const propValidators = validators[propName] || [];
    registeredValidators[target.constructor.name] = {
        ...validators,
        [propName]: [
            ...propValidators,
            'positive'
        ]
    };
}

function validate(obj:any){
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if( !objValidatorConfig ){
        return true;
    }
    let valid = true;
    for (const prop in objValidatorConfig){
        for(const validator of objValidatorConfig[prop]){
            switch( validator ){
                case 'required' :
                    valid = valid && !!obj[prop];
                    break;
                case 'positive' :
                    valid = valid && obj[prop] > 0;
                    break;
            }
        }
    }
    return valid;
}

class Course {
    @Required
    title:string;

    @PositiveNumber
    price:number;

    constructor(t:string, p:number){
        this.title=t;
        this.price=p;
    }
}

const courseForm  = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if( !validate(createdCourse) ){
        alert('Invalid input, please try again!');
        return;
    }
    console.log('Course', createdCourse);
})