# Covid-19 Live Stats
> 😷 A website for you get info about Covid-19 in your country and in the world! 😷

## Get Started

### If you only want to test and visit the website/final result:
1. Click in the link in the description
2. Enjoy :)

### If you want to contribute with the project or run in your local machine:
1. Git clone or download this repo
2. Go to the directory that you downloaded
3. Create a .env file in the root of the project
4. Add these lines:
```
key_api_statistics_country=""
key_api_statistics=""
mapbox_token=""

```
5. Get a key for the first and second api key in https://rapidapi.com/api-sports/api/covid-193?endpoint=apiendpoint_2feca6f0-0f58-40b7-9196-98c45c7d5083
6. Get a mapbox token in https://docs.mapbox.com/mapbox-gl-js/api/
7. Open a terminal in the project directory and run: ``npm i dotenv-webpack`` and ``npm i webpack webpack-cli --save-dev``
8. Make changes (for make changes in Javascript, change the file in src/index.js and run ``npx webpack``)
9. Make a pull request :)

## Todo

Backend:
- [x] Get the user country by ip
- [x] Get covid-19 data for the user country
- [x] Build charts with Chart.js (together with frontend)
- [x] Build map with Mapbox GL JS (together with frontend)
- [x] Add markers in countries with Covid-19
- [x] Add diferent colors in map markers for active cases
- [x] Get global covid-19 data
- [ ] Data and chart real time update while user stay in website
- [x] User can select the country to see info (together with frontend)
- [ ] Register to receive notifications with the user's country information every 1 hour

Frontend:
- [x] Geral structure
- [x] CSS for desktop view
- [x] Build charts with Chart.js (together with backend)
- [x] Build map with Mapbox GL JS (together with backend)
- [x] CSS for mobile view
- [ ] Number/Counter animated
- [x] User can select the country to see info (together with backend)

⚠️ Warning ⚠️
If you're using ad blocker, disable this!!! The website won't work correctly! (The data won't load!)
