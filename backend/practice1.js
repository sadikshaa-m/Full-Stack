import axios from "axios";
import fs from "fs";

//greet function

// const { default: axios } = require("axios");

function greet(name) {
    return `Hello, ${name}`;
}
const name= "ram";
console.log(greet(name));


// make a function that give you total, it takes array of number as argument
const num = [1,2,3];
function total(numb) {
    let sum = 0;
    for(let n of numb) {
        sum += n;
    }
    return sum;
}


console.log(total(num));



//modules
//asynchronous func -- kei time pachi respose dini func  --yesle block gardaina
// Example

const greetUser = greet;
setTimeout(()=> {
console.log(greetUser("Ram"));
}, 3000);

const some= new Promise((resolve, reject)=> {
    reject('hello');
});

some.then((data) => {
    console.log(`data is ${data}`);
}).catch((err) => {
    console.log(`error is ${err}`);
});

// try catch is better

const func = async() => {
    try{
          const result = await some;
    console.log(`result: ${result}`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
    };
    func();

    const m = axios.get('https://jsonplaceholder.typicode.com/users');

m.then((res) => {
  console.log(res.data);
}).catch((err) => {
  console.log(err);
})




//asynchronous lai no sync -- synchronous lai use sync eg: readfilesync
fs.readFile('./theory', 'utf-8', (err, data)=>{
  console.log(err);
  console.log(data);

});

// fs.writeFile('./sam.txt', 'hello miss Sadiksha', 'utf-8', (err)=>{

// })

//append le paila ko j cha tyo rahancha update matra garcha tyo file ma-
// fs.appendFile('./sam.txt', 'sell', 'utf-8', (err) => {

// })

console.log('sello bhai');


fs.writeFile('./sadiksha', 'i am sadiksha. Thank you', 'utf-8', (err)=>{

})

fs.appendFile('./sadiksha', 'i live in ktm', 'utf-8', (err)=>{
  
})

//delete file
// fs.unlink('./sam.txt', (err)=> {

// })

//file cha ki chaina herna- synchronous use garnu parcha 
if(fs.existsSync('./sam.txt')){
  fs.unlink('./sam.txt', (err)=> {
    console.log(err);
  })

}else {
  fs.writeFile('./sam.txt', 'hello person', 'utf-8', (err)=> {

  })
}

//to make a folder-
fs.mkdir('./uploads', (err)=> {

})
//to remove a folder-
fs.rmdir('./uploads', (err)=>{

})

//rename 
fs.rename('./sadiksha', './sadikshaaa', (err)=> {

});