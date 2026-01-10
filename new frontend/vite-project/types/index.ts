 


//let use garyo bhane pachi value change garna paincha const garyo bhane paindaina-- 






 let personName: string = 'hello';

const n: number = 90;
const isLogin: boolean = false;

 personName = 'sadiksha';  

 const addSUm = (a: string, b: number) => {
    console.log(`${a} ${b}`);
 }
 
 //object
 const Person: {
    name: string;
    age: number;
    salary: number;
 } = {name: 'sadiksha', age:10, salary: 100000};

 console.log(Person.name, Person.age, Person.salary);
 

 //any type---- type thabhayena bhane use any
 let per: any = 'lio ksdfn';

per = 90;
per = false;


//how to define multiple type--
let a: string | number | boolean = 900;
a = 'class';
a = 30; 
a = false;  //yo ma string ni halna milcha number ni halna milcha


const greetPerson = ():string => {
    return 'hello man'
}   //greetPerson function returns string

const greet = ():string | number => {
    return 70;
}

const greetPer = (): {name: string, age: number} => {
    return {age:90, name: 'sad'};
}


//array
const Per: (number | string)[] = [11,22,'namama']



//interface-------------------------------used for object
interface Persons {
    name: string;
    age?: number;   //question mark dida tyo value haleni huncha nahale ni huncha
    func: ()=> void
}

const getSome = (a:Persons) => {
    console.log(a.age, a.name);
}
getSome({name: 'sad', func:()=> 'sad'});

//filling it is object 
interface Bank {
 readonly name: string;   //readonly property halyo bhane value feri assign garna paudaina
    location: string;
}
const b: Bank={
    name: 'Siddhartha Bank',
    location: 'Kathmandu'
}


interface car {
    brand: string,
    model?: string,
    year?: number;
}
const c: car ={
    brand: 'Toyota'
}