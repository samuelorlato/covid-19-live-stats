var country, select

function loadData(locate){
    document.getElementById("in-country").innerHTML = locate
    document.getElementById("country-footer").innerHTML = locate
    fetch("https://covid-193.p.rapidapi.com/statistics?country="+locate, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.key_api_statistics_country,
                "x-rapidapi-host": "covid-193.p.rapidapi.com"
            }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        try{
            document.getElementById("recovered").innerHTML = data.response[0].cases.recovered.toLocaleString()
        }
        catch{
            document.getElementById("recovered").innerHTML = "Without data"
        }
        try{
            document.getElementById("deaths").innerHTML = data.response[0].deaths.total.toLocaleString()
        }
        catch{
            document.getElementById("deaths").innerHTML = "Without data"
        }
        try{
            document.getElementById("confirmed").innerHTML = data.response[0].cases.total.toLocaleString()
        }
        catch{
            document.getElementById("confirmed").innerHTML = "Without data"
        }
        try{
            document.getElementById("active").innerHTML = data.response[0].cases.active.toLocaleString()
        }
        catch{
            document.getElementById("active").innerHTML = "Without data"
        }
        drawChart(country, [data.response[0].cases.total], [data.response[0].cases.active], [data.response[0].deaths.total], [data.response[0].cases.recovered])
    })
}

fetch("https://ipapi.co/json/")
.then(response => {
    return response.json()
})
.then(geolocation => {
    country = geolocation.country_name
    loadData(country)
})
fetch("https://covid-193.p.rapidapi.com/statistics", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.key_api_statistics,
                "x-rapidapi-host": "covid-193.p.rapidapi.com"
            }
    })
.then(response => {
    return response.json()
})
.then(data => {
    var countries = []
    data.response.forEach(element => {
        countries.push(element.country)
    })
    select = document.getElementById("country")
    var i = 0
    countries.sort()
    countries.forEach(element => {
        if(element == country){
            var opt = document.createElement("option")
            opt.value = element
            opt.text = element
            opt.selected = true
            opt.className = "opt"
            select.add(opt, select[i])
        }
        else if(element == "All"){
            
        }
        else{
            var opt = document.createElement("option")
            opt.value = element
            opt.text = element
            opt.className = "opt"
            select.add(opt, select[i])
        }
        i++
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
mapboxgl.accessToken = process.env.mapbox_token
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

document.getElementById("country").onchange = () => {
    document.getElementById("recovered").innerHTML = "Loading"
    document.getElementById("deaths").innerHTML = "Loading"
    document.getElementById("confirmed").innerHTML = "Loading"
    document.getElementById("active").innerHTML = "Loading"
    loadData(document.getElementById("country").options[document.getElementById("country").selectedIndex].value)
}
