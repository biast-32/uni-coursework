const form = document.getElementById("search-form")
form.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const dataQuery = document.getElementById("input-show").value
    const url = `https://api.tvmaze.com/search/shows?q=${dataQuery}`
    
    try{
        const dataPromise = await fetch(url);
        const dataJSON = await dataPromise.json()

        const showContainer = document.getElementById("show-container")
        showContainer.innerHTML = ""

        dataJSON.forEach(item => {
            const show = item.show
            const showElement = document.createElement("div")
            showElement.className = "show-data"

            showElement.innerHTML = `
            <img src="${show.image ? show.image.medium:""}" alt="${show.name}">
            <div class="show-info">
                <h1>${show.name}</h1>
                <p>${show.summary}</p>
            </div>
            `

            showContainer.appendChild(showElement)
        })
    } catch (error) {
        console.error("Error: ", error)
    }})