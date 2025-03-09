const municipalityCodes = {}

const jsonQueryBirthDeath = {
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
                "values": ["vm01", "vm11"]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}

const getCodes = async () => {
    const codesUrl = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
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

const getBirthDeathData = async () => {
    const selectedMunicipality = localStorage.getItem("selectedMunicipality") || "SSS"
    jsonQueryBirthDeath.query[1].selection.values = [selectedMunicipality]

    const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"
    const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(jsonQueryBirthDeath)
    })

    if (!res.ok) {
        return
    }

    const data = await res.json()

    const births = data.value.slice(0, 22)
    const deaths = data.value.slice(22, 44)
    const years = jsonQueryBirthDeath.query[0].selection.values

    buildBarChart(years, births, deaths)
}

function buildBarChart(labels, births, deaths) {
    const chart = new frappe.Chart("#newchart", {
        title:"Births and deaths",
        data: {
            labels: labels,
            datasets: [
                {
                    name: "Births",
                    type: "bar",
                    values: births,
                    colors: ['#63d0ff']
                },
                {
                    name: "Deaths",
                    type: "bar",
                    values: deaths,
                    colors: ['#363636']
                }
            ]
        },
        type: "bar",
        height: 450
    })
}

document.addEventListener('DOMContentLoaded', () => {
    getCodes().then(() => getBirthDeathData())
})