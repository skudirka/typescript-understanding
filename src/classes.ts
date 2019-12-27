abstract class Department {
    protected employees:string[] = [];

    // TS makes these as instance variables 
    constructor(protected readonly id:string, public name:string){
    }

    abstract describe(this:Department):void;

    addEmployee(employee:string){
        this.employees.push(employee);
    }

    printEmployeeInformation(){
        console.log(this.employees.length, this.employees);
    }
}

class ITDepartment extends Department {
    static fiscalYear = 2020;
    private _lastReport:string = 'No report';
    
    constructor(id:string, public admins:string[]){
        super(id, 'IT');
    }

    // can override because it is protected
    addEmployee(name:string){
        this.employees.push(name);
    }

    set lastReport( val:string ){
        this._lastReport = val;
    }

    get lastReport(){
        return this._lastReport;
    }

    describe(){
        console.log(`Department ${this.name}, ID:${this.id}`);
    }

    static createEmployee(prefix:string){
        const idNum = Math.floor(Math.random() * 10000);
        return prefix + 'Employee' + idNum;
    }
}

class AccountingDepartment extends Department {
    constructor(id:string, public admins:string[]){
        super(id, 'Accounting');
    }

    describe(){
        console.log(`Department ${this.name}, ID:${this.id}`);
    }
}

class SingletonDepartment extends Department {
    private static instance:SingletonDepartment;
    
    private constructor(){
        super('1', 'Singleton');
    }

    static getInstance() {
        if( !SingletonDepartment.instance ){
            SingletonDepartment.instance = new SingletonDepartment();
        }
        return SingletonDepartment.instance;
    }

    describe(){
        console.log(`Department ${this.name}, ID:${this.id}`);
    }
}

const tech = new ITDepartment('007', ['Steve']);

tech.addEmployee('Steve');
tech.addEmployee('Peter');
tech.addEmployee( ITDepartment.createEmployee('generated') );

tech.describe();
tech.printEmployeeInformation();

tech.lastReport = 'There he is!';
console.log('Last Report', tech.lastReport);
console.log('Fiscal Year', ITDepartment.fiscalYear);

const accounting = new AccountingDepartment('008', ['John']);

accounting.addEmployee('John');
accounting.addEmployee('Mike');

accounting.describe();
accounting.printEmployeeInformation();

const singleton = SingletonDepartment.getInstance();
singleton.describe();