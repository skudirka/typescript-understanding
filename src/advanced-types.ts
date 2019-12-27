type Admin = {
    name:string;
    privileges:string[];
};

type Employee = {
    name:string;
    startDate:Date;
};

type ElevatedEmployee = Admin & Employee; // intersection type

const e1:ElevatedEmployee = {
    name: 'Steve',
    privileges: ['create-server'],
    startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // intersection type

function addCombinable(n1:number, n2:number):number; // Function Overloading - helps typescript understand the return type
function addCombinable(n1:string, n2:string):string;
function addCombinable(n1:number, n2:string):string;
function addCombinable(n1:string, n2:number):string;
function addCombinable(n1:Combinable, n2:Combinable){
    if(typeof n1==='string' || typeof n2==='string'){ // type guard
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
};

type UnknownEmployee = Employee | Admin;

const printEmplyeeInformation = (emp:UnknownEmployee) => {
    console.log('Name:', emp.name);
    if('privileges' in emp){ // type guard for intersections
        console.log('Privileges:', emp.privileges);
    }
    if('startDate' in emp){ // type guard for intersections
        console.log('Start Date:', emp.startDate);
    }
}

printEmplyeeInformation( e1 );
printEmplyeeInformation( {
    name: 'John',
    startDate: new Date()
} );

class Car {
    drive(){
        console.log('Driving a car...');
    }
}

class Truck {
    drive(){
        console.log('Driving a truck...');
    }

    loadCargo(amount:number=1){
        console.log('Loading cargo...', amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle:Vehicle) => {
    vehicle.drive();
    if( vehicle instanceof Truck){ // type guard for classes
        vehicle.loadCargo();
    }
}

useVehicle( v1 );
useVehicle( v2 );

interface Bird {
    type: 'bird', // type ID for interfaces
    flyingSpeed:number;

}

interface Horse {
    type: 'horse',
    runningSpeed:number;
}

type Animal = Bird | Horse; // discriminated unions

const moveAnimal = (animal:Animal) => {
    let speed;
    switch(animal.type){ // type guard for interfaces
        case 'bird' :
            speed = animal.flyingSpeed;
            break;
        default :
            speed = animal.runningSpeed;

    }
    console.log('Moving animal with speed', speed);
}

moveAnimal({
    type: 'bird',
    flyingSpeed: 10
});

const userInputElement = document.getElementById('message-input')! as HTMLInputElement;
userInputElement.value = 'There he is!';

// Index types
interface ErrorContainer {
    [prop:string]:string; // can be any string property or key with a string value
}

const errorBag:ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must start with a capital character!'
};

// Function Overloads
const result  = addCombinable('Steve', 'Peter');
result.split('e'); // typescript will know that a string will return because of the function overloads above

// Optional Chaining
const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: {
        title: 'CEO',
        description: 'My own company'
    }
}
console.log('Job:', fetchedUserData?.job?.title); // safely checks the nested properties before continuing 

// Nullish Coalescing
const userInput = '';
const storedData = userInput ?? 'Default'; // this will keep the empty string
console.log('storedData', storedData.length);