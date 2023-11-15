

function getWeather() {
  const selectedCity = document.getElementById('cities').value;

  const cities = [
    { name: 'liege', lat: 50.6412, lon: 5.5718 },
    { name: 'antwerpen', lat: 51.2194, lon: 4.4025 },
    { name: 'brussels', lat: 50.8503, lon: 4.3517 }
  ];

  const selectedCityData = cities.find(city => city.name === selectedCity);
// condition au cas ou il cherche une autre ville

  if (!selectedCityData) {
    console.error('Selected city not found.');
    return;
  }

  const apiKey = "3d2dbe291b151cc6cc3095b9916cef50";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCityData.lat}&lon=${selectedCityData.lon}&appid=${apiKey}&units=metric`;

  let weatherOutput = document.getElementById('weather-output');

  fetch(weatherUrl)
    .then(response => {
      return response.json();
    })
    .then(weatherData => {

      // afficher les previsions actuelles 

      weatherOutput.innerHTML = '';
      const currentTemperature = weatherData.list[0].main.temp;
      const currentDescription = weatherData.list[0].weather[0].description;
      const currentTimestamp = weatherData.list[0].dt_txt;

      console.log(currentTemperature);
      console.log(currentDescription);
      console.log(currentTimestamp);

      // un for each pour looper

      weatherData.list.forEach(element => {
        const forecastTemperature = element.main.temp;
        const forecastDescription = element.weather[0].description;
        const timestamp = element.dt_txt;
        const iconUrl = `https://openweathermap.org/img/wn/${element.weather[0].icon}.png`;

        console.log(forecastTemperature);
        console.log(forecastDescription);
        console.log(timestamp);

        // inserer un html
        const liElement = document.createElement('li');

        liElement.innerHTML = `
          <img src="${iconUrl}" alt="icon">
          <p>Temperature: ${forecastTemperature}°C</p>
          <p>Description: ${forecastDescription}</p>
          <p>Timestamp: ${timestamp}</p>
        `;

        weatherOutput.appendChild(liElement);
      });
    })
    .catch(error => {
      console.error(error);
    });
}
