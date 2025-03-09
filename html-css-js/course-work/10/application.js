const jsonQuery = {
    "query": [
      {
        "code": "Sukupuoli",
        "selection": {
          "filter": "item",
          "values": [
            "SSS"
          ]
        }
      },
      {
        "code": "Puolue",
        "selection": {
          "filter": "item",
          "values": [
            "03",
            "02",
            "01",
            "04",
            "05",
            "06",
            "07",
            "08"
          ]
        }
      },
      {
        "code": "Vaalipiiri ja kunta vaalivuonna",
        "selection": {
          "filter": "item",
          "values": [
            "SSS"
          ]
        }
      },
      {
        "code": "Tiedot",
        "selection": {
          "filter": "item",
          "values": [
            "evaa_aanet_medv_pros"
          ]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
  }

  const getData = async () => {
    const url = "https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/evaa/statfin_evaa_pxt_13sw.px"
    const res = await fetch(url, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(jsonQuery)
    })

    if(!res.ok) {
        return;
    }
    const data = await res.json()
    return data
  }

  const buildChart = async () => {
    const data = await getData()
    //console.log(data)

    //Objects.values TURNS OBJECT INTO ARRAY 
    //YOU DON'T HAVE TO SO IT YOURSELF 
    //AND LOSE EntIrE dAys 
    const parties = Object.values(data.dimension.Puolue.category.label)
    const labels = Object.values(data.dimension.Vuosi.category.label)
    const values = data.value

    //console.log(parties)
    //console.log(labels)
    //console.log(values)

    parties.forEach((party, index) => {
        let partySupport = []
        for(let i = 0; i < 11; i++) {
            partySupport.push(values[i * 8 + index])
        }
        parties[index] = {
            name: party,
            values: partySupport
        }
    })

    //console.log(parties)

    const chartData = {
        labels: labels,
        datasets: parties
    }

    const chart = new frappe.Chart("#chart", {
        title: "Finnish parliament elections",
        data: chartData,
        type: "line",
        height: 400,
        colors: ['#f54b4b','#ffde55','#006288','#349a2b','#61bf1a','#f00a64','#ffdd93','#0135a5'],
        //barOptions: {
        //   stacked: 1
        //}

        lineOptions: {
            hideDots: 1,
            regionFill: 0
        }
    })

  }

  buildChart()




  
/*const data = {
    labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am",
        "12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"
    ],
    datasets: [
        {
            name: "Some Data", type: "bar",
            values: [25, 40, 30, 35, 8, 52, 17, -4]
        },
        {
            name: "Another Set", type: "line",
            values: [25, 50, -10, 15, 18, 32, 27, 14]
        }
    ]
}

const chart = new frappe.Chart("#chart", {  // or a DOM element,
                                            // new Chart() in case of ES6 module with above usage
    title: "My Awesome Chart",
    data: data,
    type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
    height: 250,
    colors: ['#7cd6fd', '#743ee2']
})*/