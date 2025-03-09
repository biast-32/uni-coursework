let imageSrc = ""

const submitButton = document.getElementById("submit-data")
submitButton.addEventListener("click", (event) =>{

    event.preventDefault()

    let username = document.getElementById("input-username").value
    let email = document.getElementById("input-email").value
    let admin

    if (document.getElementById("input-admin").checked) {
        admin = "X"
    } 
    else {
        admin = "-"
    }

    let tableBody = document.getElementById("tableBody")
    let rows = tableBody.getElementsByTagName("tr")

    let existingRow = 0

    for (let i = 0; i < rows.length; i++) {
        let space = rows[i].getElementsByTagName("td")
        if(space[0].innerText === username) {
            space[1].innerText = email;
            space[2].innerText = admin;
            space[3].innerHTML = imageSrc ? `<img src="${imageSrc}" width="64" height="64">` : "";
            existingRow = 1;
            break
        }
    }

    if (existingRow == 0) {
        let newRow = document.createElement("tr")

        let usernameSpace = document.createElement("td")
        let emailSpace = document.createElement("td")
        let adminSpace = document.createElement("td")
        let imageSpace = document.createElement("td")

        usernameSpace.innerText = username
        emailSpace.innerText = email
        adminSpace.innerText = admin
        imageSpace.innerHTML = imageSrc ? `<img src="${imageSrc}" width="64" height="64">` : "";

        newRow.appendChild(usernameSpace)
        newRow.appendChild(emailSpace)
        newRow.appendChild(adminSpace)
        newRow.appendChild(imageSpace)

        tableBody.appendChild(newRow)
    }
})


const emptyButton = document.getElementById("empty-table")
emptyButton.addEventListener("click", () => {
    let tableBody = document.getElementById("tableBody")
    tableBody.innerText = ""
})


const uploadButton = document.getElementById("upload")
uploadButton.addEventListener("click", (event) => {
    event.preventDefault()
    const file = document.getElementById("input-image").files[0]
    if(!file)return

    imageSrc = URL.createObjectURL(file)
    
})
