const tableBody = document.getElementById("tableBody")

async function getData() {
    const url1 = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff"
    const dataPromise1 = await fetch(url1)
    const dataJSON1 = await dataPromise1.json()

    const url2 = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
    const dataPromise2 = await fetch(url2)
    const dataJSON2 = await dataPromise2.json()

    const municipalities = dataJSON1.dataset.dimension.Alue.category.label
    const populations = dataJSON1.dataset.value
    const employment = dataJSON2.dataset.value

    let i = 0

    for (let key in municipalities) {
        if (municipalities.hasOwnProperty(key)) {
            let tr = document.createElement("tr")
            let tdM = document.createElement("td")
            let tdP = document.createElement("td")
            let tdE = document.createElement("td")
            let tdEP = document.createElement("td")

            let EP = (employment[i]*100/populations[i]).toFixed(2)

            if (EP > 45) {
                tr.classList.add("over-45") 
            } else if (EP < 25) {
                tr.classList.add("under-25")
            }

            tdM.innerText = municipalities[key]
            tdP.innerText = populations[i]
            tdE.innerText = employment[i]
            tdEP.innerText = EP + "%"

            tr.appendChild(tdM)
            tr.appendChild(tdP)
            tr.appendChild(tdE)
            tr.appendChild(tdEP)

            tableBody.appendChild(tr)

            i++
        }
    }
}

document.addEventListener("DOMContentLoaded", getData)
