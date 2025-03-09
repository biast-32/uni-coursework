const jsonQuery = {
    "query": [
        {
            "code": "Vuosi",
            "selection": {
                "filter": "item",
                "values": [
                    "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007",
                    "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015",
                    "2016", "2017", "2018", "2019", "2020", "2021"
                ]
            }
        },
        {
            "code": "Alue",
            "selection": {
                "filter": "item",
                "values": ["SSS"]
            }
        },
        {
            "code": "Tiedot",
            "selection": {
                "filter": "item",
                "values": ["vaesto"]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}


const municipalityCodes = {}
let chartData= []

const getCodes = async () => {
    const codesUrl = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"
    const res = await fetch(codesUrl)

    if (!res.ok) {
        return
    }

    const data = await res.json()
    const codes = data.variables[1].values
    const names = data.variables[1].valueTexts

    for (let i = 0; i < codes.length; i++) {
         municipalityCodes[names[i].toUpperCase()] = codes[i]
    }
}

const getData = async (municipality) => {
    if(municipality && municipalityCodes[municipality]) {
        jsonQuery.query[1].selection.values = [municipalityCodes[municipality]]
        localStorage.setItem("selectedMunicipality", municipalityCodes[municipality])
    } else {
        jsonQuery.query[1].selection.values = ["SSS"];
        localStorage.setItem(s="selectedMunicipality", "SSS")
    }

    const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"
    const res = await fetch(url, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(jsonQuery)
    })

    if (!res.ok) {
        return
    }
    const data = await res.json()
    const population = data.value
    const years = jsonQuery.query[0].selection.values

    chartData = population
    buildChart(years, population)
}

function buildChart(labels, data) {

    const chart = new frappe.Chart("#chart", {
        title: "Population growth",
        data: {
            labels: labels,
            datasets: [
                {   name:"Population",
                    type: "line",
                    values: data
                }
            ]
        },
        type: "line",
        height: 450,
        colors: ['#eb5146']
    })

}

const submitDataButton = document.getElementById("submit-data")
submitDataButton.addEventListener("click", function(event){
    event.preventDefault()
    const inputArea = document.getElementById("input-area").value.trim().toUpperCase()
    getData(inputArea)
})

document.addEventListener('DOMContentLoaded', () => {
    getCodes().then(() => getData())
})

const addDataButton = document.getElementById("add-data");
addDataButton.addEventListener("click", function (event) {
    event.preventDefault()

    let deltaSum = 0
    for (let i = 1; i < chartData.length; i++) {
        deltaSum += chartData[i] - chartData[i - 1]
    }
    const meanDelta = deltaSum / (chartData.length - 1)

    const newDataPoint = chartData[chartData.length - 1] + meanDelta

    chartData.push(newDataPoint)

    const years = jsonQuery.query[0].selection.values.concat((parseInt(jsonQuery.query[0].selection.values[jsonQuery.query[0].selection.values.length - 1]) + 1).toString())
    buildChart(years, chartData);
})
