// Generic Functions

/*const merge = <T, U>(objA:T, objB:U) => { //intersection of two object types
    return Object.assign(objA, objB);
};*/
const merge = <T extends object, U extends object>(objA:T, objB:U) => { //intersection of two object types, forced to be at least an object
    return Object.assign(objA, objB);
};

const mergedObj = merge({name: 'Steve'}, {age: 38});
console.log('Merged Age:', mergedObj.age);

// Using interfaces with generics
interface Lengthy {
    length:number;
}

const countAndDescribe = <T extends Lengthy>(element:T):[T, string] => { 
    let descriptionText = 'Got no value.';
    if(element.length === 1){
        descriptionText = 'Got 1 element.';
    } else if( element.length > 1 ){
        descriptionText = 'Got '+element.length+' elements.';
    }
    return [element, descriptionText];
};

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(['Sports', 'Cooking']));
console.log(countAndDescribe([]));

// Constraints

const extractAndConvert = <T extends object, U extends keyof T>(obj:T, key:U) => { // keyof
    return obj[key];
};
console.log('extractAndConvert', extractAndConvert({name:'Steve'}, 'name'));


// Generic Classes

class DataStorage<T extends string | number | boolean> { //must be primitive, otherwise removeItem logic below may not work
    private data:T[] = [];

    addItem(item:T) {
        this.data.push(item);
    }

    removeItem(item:T){
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems():T[] {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Steve');
textStorage.addItem('Peter');
textStorage.addItem('Kudirka');
textStorage.removeItem('Peter');
console.log('textStorage items', textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(55);
numberStorage.addItem(25);
numberStorage.addItem(35);
numberStorage.removeItem(35);
console.log('numberStorage items', numberStorage.getItems());


// Generic Utility Types

interface CourseGoal {
    title:string;
    description:string;
    completeUntil:Date;
}

// Partial
const createCourseGoal = (title:string, description:string, date:Date):CourseGoal => {
    let courseGoal:Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
    /*return {
        title,
        description,
        completeUntil: date
    };*/
}

// Readonly
const lockedNames:Readonly<string[]> = ['Steve', 'Peter']; // can't alter array
//lockedNames.push('John'); <-- NOT ALLOWED