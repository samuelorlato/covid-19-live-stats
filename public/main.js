(()=>{var e,t,o;function a(t){document.getElementById("in-country").innerHTML=t,fetch("https://covid-193.p.rapidapi.com/statistics?country="+t,{method:"GET",headers:{"x-rapidapi-key":"*","x-rapidapi-host":"covid-193.p.rapidapi.com"}}).then((e=>e.json())).then((t=>{console.log(t);try{document.getElementById("recovered").innerHTML=t.response[0].cases.recovered.toLocaleString()}catch{document.getElementById("recovered").innerHTML="Without data"}try{document.getElementById("deaths").innerHTML=t.response[0].deaths.total.toLocaleString()}catch{document.getElementById("deaths").innerHTML="Without data"}try{document.getElementById("confirmed").innerHTML=t.response[0].cases.total.toLocaleString()}catch{document.getElementById("confirmed").innerHTML="Without data"}try{document.getElementById("active").innerHTML=t.response[0].cases.active.toLocaleString()}catch{document.getElementById("active").innerHTML="Without data"}!function(e,t,a,n,r){o&&o.destroy();var c=document.getElementById("chart").getContext("2d");o=new Chart(c,{type:"bar",data:{datasets:[{label:"Confirmed",data:t,fill:!1,borderColor:"#197816",backgroundColor:"#197816",borderWidth:1},{label:"Active",data:a,fill:!1,borderColor:"#18cc12",backgroundColor:"#18cc12",borderWidth:1},{label:"Deaths",data:n,fill:!1,borderColor:"#eb1212",backgroundColor:"#eb1212",borderWidth:1},{label:"Recovered",data:r,fill:!1,borderColor:"#3363F7",backgroundColor:"#3363F7",borderWidth:1}],labels:["Covid-19 in "+e]},options:{responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{callback:e=>e.toLocaleString()}}]}}})}(e,[t.response[0].cases.total],[t.response[0].cases.active],[t.response[0].deaths.total],[t.response[0].cases.recovered])}))}fetch("https://ipapi.co/json/").then((e=>e.json())).then((t=>{a(e=t.country_name)})),fetch("https://covid-193.p.rapidapi.com/statistics",{method:"GET",headers:{"x-rapidapi-key":"*","x-rapidapi-host":"covid-193.p.rapidapi.com"}}).then((e=>e.json())).then((o=>{countries=[],o.response.forEach((e=>{countries.push(e.country)})),t=document.getElementById("country");var a=0;countries.sort(),countries.forEach((o=>{if(o==e)(n=document.createElement("option")).value=o,n.text=o,n.selected=!0,n.className="opt",t.add(n,t[a]);else if("All"==o);else{var n;(n=document.createElement("option")).value=o,n.text=o,n.className="opt",t.add(n,t[a])}a++}))})),mapboxgl.accessToken="*";var n=new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/dark-v10",zoom:1.5,center:[0,20]});function r(e,t,o){var a=e-t-o;return a>=2e6?"#530000":a>=1e6?"#a70000":a>=1e5?"#ff0000":a>=5e4?"#ff5252":a>=1e4?"#ff7b7b":a>=1e3?"#ffbaba":a<1e3?"#ffcdd2":a<=100?"#ffebee":a<=0?"white":void 0}fetch("https://corona-api.com/countries",{method:"GET",redirect:"follow"}).then((e=>e.json())).then((e=>{e.data.forEach((e=>{var t=e.coordinates.longitude,o=e.coordinates.latitude,a=e.latest_data.confirmed,c=e.latest_data.deaths,d=e.latest_data.recovered;new mapboxgl.Marker({color:r(a,c,d)}).setLngLat([t,o]).addTo(n)}))})),fetch("https://corona-api.com/timeline",{method:"GET",redirect:"follow"}).then((e=>e.json())).then((e=>{var t=e.data[0].confirmed,o=e.data[0].deaths,a=e.data[0].recovered,n=e.data[0].active;document.getElementById("confirmed-global").innerHTML=t.toLocaleString(),document.getElementById("deaths-global").innerHTML=o.toLocaleString(),document.getElementById("recovered-global").innerHTML=a.toLocaleString(),document.getElementById("active-global").innerHTML=n.toLocaleString()})),document.getElementById("country").onchange=()=>{a(document.getElementById("country").options[document.getElementById("country").selectedIndex].text)}})();