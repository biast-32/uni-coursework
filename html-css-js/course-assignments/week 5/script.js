const fetchData = async () => {
    const url = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
    const response = await fetch(url)
    const data = await response.json()

    const urlPos = "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f"
    const promisePos = await fetch(urlPos)
    const data2 = await promisePos.json()

    const urlNeg = "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e"
    const promiseNeg = await fetch(urlNeg)
    const data3 = await promiseNeg.json()

    //this is where you made the array with ALL NAMES
    //and it has like 310 elements
    //because the first is the WHOLE COUNTRY
    //DO NO forget -_-    
    const allNames = []
        data.features.forEach(feature => {
            const name = feature.properties.name
            const index = feature.properties.kunta
            const element = { name: name, index: index }
            allNames.push(element)
        })

    //this is where you made the one for POSITIVE MIGRATION DATA
    //and it has 309 elements because there is NO WHOLE COUNTRY thing
    //so it's i+1 here 
    //DO NO forget -_- 
    const posMunNames = data2.dataset.dimension.Tuloalue.category.label
    const posMunVals = data2.dataset.value
    const posMunData = []

    Object.keys(posMunNames).forEach((key, index) => {
        const posMun = posMunNames[key]
        const posMig = posMunVals[index]

        const posObj = {
            positiveMigration: posMig
        }

        posMunData.push(posObj)
    })

    //this is where you made the one for NEGATIVE MIGRATION DATA
    //and it has 309 elements because there is NO WHOLE COUNTRY thing
    //so it's i+1 here as well
    //DO NO forget -_- 
    const negMunNames = data3.dataset.dimension.Lähtöalue.category.label
    const negMunVals = data3.dataset.value
    const negMunData = []

    Object.keys(negMunNames).forEach((key, index) => {
        const negMun = negMunNames[key]
        const negMig = negMunVals[index]

        const negObj = {
            negativeMigration: negMig
        };

        negMunData.push(negObj)
    });
    
    const combinedData = []
    for (let i = 0; i < allNames.length; i++){
        const posIndex = i + 2 < posMunData.length ? i + 2 : 0
        const negIndex = i + 2 < negMunData.length ? i + 2 : 0

        const area = {
            name: allNames[i].name,
            areaPosMig: posMunData[posIndex]?.positiveMigration || 0,
            areaNegMig: negMunData[negIndex]?.negativeMigration || 0
        }
        combinedData.push(area)
    }

    initMap(data, combinedData)
}

const initMap = (data, combinedData) => {
    const map = L.map('map', {
        minZoom: -3
    })

    let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap"
    }).addTo(map)

    let geoJson = L.geoJSON(data, {
        style: (feature) => styleFeature(feature, combinedData),
        onEachFeature: (feature, layer) => getFeature(feature, layer, combinedData)
    }).addTo(map)

    map.fitBounds(geoJson.getBounds())
}

const getFeature = (feature, layer, combinedData) => {
    const area = combinedData.find(area => area.name === feature.properties.name)
        layer.bindPopup(
            `<div>
                <ul>
                    <li>Positive Migration: ${area.areaPosMig}</li>
                    <li>Negative Migration: ${area.areaNegMig}</li>
                </ul>
            </div>`
        )
        layer.bindTooltip(area.name) 
}

const styleFeature = (feature, combinedData) => {
    const area = combinedData.find(area => area.name === feature.properties.name)

    let hue = 0
    if(area) {
        const posMig = area.areaPosMig || 0
        const negMig = area.areaNegMig || 1

        hue = Math.min((posMig/negMig)** 3 * 60, 120)
        console.log(hue)
        //if (hue > 120) {
            //hue = 120
        //}
    }

    return {
        color: `hsl(${hue}, 75%, 50%)`
    }
}

fetchData()