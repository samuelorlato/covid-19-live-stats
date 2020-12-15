fetch("https://ipapi.co/json/")
.then(response => {
    return response.json()
})
.then(geolocation => {
    var country = geolocation.country_name
    document.getElementById("in-country").innerHTML = country
    fetch("https://covid-193.p.rapidapi.com/statistics?country="+country, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "*",
                "x-rapidapi-host": "covid-193.p.rapidapi.com"
            }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        document.getElementById("country").innerHTML = country
        document.getElementById("recovered").innerHTML = data.response[0].cases.recovered.toLocaleString()
        document.getElementById("deaths").innerHTML = data.response[0].deaths.total.toLocaleString()
        document.getElementById("confirmed").innerHTML = data.response[0].cases.total.toLocaleString()
        document.getElementById("active").innerHTML = data.response[0].cases.active.toLocaleString()
        drawChart(country, [data.response[0].cases.total], [data.response[0].cases.active], [data.response[0].deaths.total], [data.response[0].cases.recovered])
    })
})
var chart
function drawChart(country, confirmed, active, deaths, recovered){
    if(chart){
        chart.destroy()
    }
    var ctx = document.getElementById("chart").getContext("2d")
    chart = new Chart(ctx, {
        type: "bar",
        data: {
            datasets: [{
                label: "Confirmed",
                data: confirmed,
                fill: false,
                borderColor: "#197816",
                backgroundColor: "#197816",
                borderWidth: 1
            },
            {
                label: "Active",
                data: active,
                fill: false,
                borderColor: "#18cc12",
                backgroundColor: "#18cc12",
                borderWidth: 1
            },
            {
                label: "Deaths",
                data: deaths,
                fill: false,
                borderColor: "#eb1212",
                backgroundColor: "#eb1212",
                borderWidth: 1
            },
            {
                label: "Recovered",
                data: recovered,
                fill: false,
                borderColor: "#3363F7",
                backgroundColor: "#3363F7",
                borderWidth: 1 
            }
            ],

            labels: ["Covid-19 in "+country]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        callback: (val) => {
                            return val.toLocaleString()
                        }
                    }
                }]
            }
        }
    })
}
mapboxgl.accessToken = '*'
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 1.5,
    center: [0, 20]
})

function getColorCountry(confirmed, deaths, recovered){
    var actives = (confirmed-deaths)-recovered
    if(actives >= 2000000){
        return "#530000"
    }
    else if(actives >= 1000000){
        return "#a70000"
    }
    else if(actives >= 100000){
        return "#ff0000"
    }
    else if(actives >= 50000){
        return "#ff5252"
    }
    else if(actives >= 10000){
        return "#ff7b7b"
    }
    else if(actives >= 1000){
        return "#ffbaba"
    }
    else if(actives < 1000){
        return "#ffcdd2"
    }
    else if(actives <= 100){
        return "#ffebee"
    }
    else if(actives <= 0){
        return "white"
    }
}

fetch("https://corona-api.com/countries", {
	"method": "GET",
    "redirect": "follow"
})
.then(response => {
	return response.json()
})
.then(data => {
    data.data.forEach(element => {
        var longitude = element.coordinates.longitude
        var latitude = element.coordinates.latitude
        var confirmed = element.latest_data.confirmed
        var deaths = element.latest_data.deaths
        var recovered = element.latest_data.recovered
        new mapboxgl.Marker({
            color: getColorCountry(confirmed, deaths, recovered)
        }).setLngLat([longitude, latitude]).addTo(map)
    })
})

fetch("https://corona-api.com/timeline", {
    "method": "GET",
    "redirect": "follow"
})
.then(response => {
    return response.json()
})
.then(data => {
    var confirmed = data.data[0].confirmed
    var deaths = data.data[0].deaths
    var recovered = data.data[0].recovered
    var active = data.data[0].active
    document.getElementById("confirmed-global").innerHTML = confirmed.toLocaleString()
    document.getElementById("deaths-global").innerHTML = deaths.toLocaleString()
    document.getElementById("recovered-global").innerHTML = recovered.toLocaleString()
    document.getElementById("active-global").innerHTML = active.toLocaleString()
})