let demoJson = {
    "name": "Student",
    "age": 25,
    "school": "LUT",
    "courses":[
        "Introduction to Web programming",
        "Object-oriented programming",
        "User Interfaces and Usability"
    ]
}

console.log(demoJson) //object
let stringJson = JSON.stringify(demoJson)
console.log.apply(stringJson) //string
let JSObject = JSON.parse(stringJson)
console.log(JSObject) //object

const userTable = document.getElementById("users")
const postsTable = document.getElementById("posts")
const getUsersButton = document.getElementById("getUsers")

getUsersButton.addEventListener("click", getUsers)

async function getUsers() {
    const url = "https://jsonplaceholder.typicode.com/users"
    const usersPromise = await fetch(url)
    const userJSON = await usersPromise.json()

    //console.log(userJSON)

    userJSON.forEach((user) => {
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")

        td1.innerText = user.name
        td2.innerText = user.email
        td1.addEventListener("click", () => {getPosts(user.id)})
        tr.appendChild(td1)
        tr.appendChild(td2)

        userTable.appendChild(tr)
    })
}

async function getPosts(userId) {
    const url = "https://jsonplaceholder.typicode.com/users/" + userId + "/posts"
    const postsPromise = await fetch(url)
    const postsJSON = await postsPromise.json()

    //console.log(userJSON)

    postsJSON.forEach((post) => {
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")

        td1.innerText = post.title
        td2.innerText = post.body
        tr.appendChild(td1)
        tr.appendChild(td2)

        postsTable.appendChild(tr)
    })
}