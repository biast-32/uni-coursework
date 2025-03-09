const buttonA = document.getElementById("a")
const buttonB = document.getElementById("b")

function A() {
    console.log("Function A has been called!")
}

function B() {
    setTimeout(() => console.log("Function B has been called!"), 1000)
}

function helperPromise() {
    const promise = new Promise((resolve, reject) => {
        const string1 = "LUT"
        const string2 = "LUT"
        if(string1 === string2){
            resolve()
        } else {
            reject()
        }
    })
    return promise
}

async function runAsync() {
    try{
    await helperPromise()
    console.log("Async resolved")
    } catch(e) {
        console.log("Async rejected")
    }
}

buttonA.addEventListener("click", () => {
    A()
    B()
    setTimeout(()=> console.log("From the timeout"),0)

    console.log("button A has been pressed")

    /*this might be messy when having multiple then*/
    /*best to use async and await*/
    helperPromise().then(()=>{
        console.log("Promise resolved")
    }).catch(()=>{
        console.log("Promise rejected")
    })

    runAsync(); /*the ; is VERY important*/
})

buttonB.addEventListener("click", () => {
    let x = 0;
    while(x < 10000000000) {
        x++
    } //this will block the page and make it completely unresponsive
    console.log("Loop finished")
})