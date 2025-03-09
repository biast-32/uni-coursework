console.log("Am I working?")

//⭐old school⭐//
function sum(a, b){
    return a + b
}

console.log(sum(3, 5))

//⭐function in variable⭐//
let sum2 = function(a, b) {
    return a + b
}

console.log(sum2(10, 14))

//⭐anonymous function⭐//
setTimeout(function() {
    console.log("2 seconds have passed...")
    console.log(sum(24, 32))
}, 2000)


let sum3 = (a, b) => a + b
let squared = x => x * x
let largerFunction = (a,b,c) => {
    //Do smth
    return a+b/c
}

console.log(sum3(42, 65))
console.log(squared(16))

console.log("what the fluff bro?")

let button = document.getElementById("btn")

/*button.addEventListener("click", () => {
    console.log(sum3(69,32))
})*/

button.addEventListener("click", hello)

function hello(){
    console.log("hello")
}

const letter = ["A", "B", "C", "D"]
const numbers = [1,2,3,4]

let squaredNumbers = numbers.map(n => n*n)
console.log(squaredNumbers)

let age = 17
let adultAge = age >=18 && age
//if ok, it logs the age, else it logs "false"
console.log(adultAge)

function takeNumbers(x,y,z,w) {
    return x*y*z*w
}

console.log(takeNumbers(... numbers))

function printEverything(...stuff){
    console.log("Printing everything:")
    stuff.forEach(x => {
        console.log(x)
    })
}

printEverything("String", 5, 77, "sst", {0: "asda"}, [4,5,7], letter)

let data = {
    name : "meep",
    age: 132,
    address: {
        street: "meepkatu",
        code: "13254",
        city:{
            name: "Mimipunki",
            status: "breathing"
        }
    }
}

//console.log(data.address.city.name)

if(data && data.address && data.address.city){
    console.log(data.address.city.name)
} else{
   console.log("Failed")
}

console.log(data?.address?.city?.name)

let a = 0
let b = null
let c = "text"

console.log(a && c)// 0
console.log(a || c)// text
console.log(a ?? c)// 0 

console.log(b && c)// null
console.log(b || c)// text
console.log(b ?? c)// text