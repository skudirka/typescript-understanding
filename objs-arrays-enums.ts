enum Role { ADMIN=5, READ_ONLY, AUTHOR };

/*const person:{
    name:string;
    age:number;
    hobbies:string[];
    role:[number, string]; // tuple
} = {
    name: 'Steve',
    age: 38,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
};*/

const person = {
    name: 'Steve',
    age: 38,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};

console.log('person', person.name);

if(person.role === Role.ADMIN){
    console.log('Person is admin!');
}