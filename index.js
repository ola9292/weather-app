
let city = document.getElementById('city');
const myBtn = document.getElementById('myBtn');
const myBtn2 = document.getElementById('myBtn2');
const apiKey = 'f8322593f021569c6a3fbd4c305a391f';
const temp = document.getElementById('temperature');
const maxTemp = document.getElementById('maxTemp');
const minTemp = document.getElementById('minTemp');
const humidity = document.getElementById('humidity');
const description = document.getElementById('description');
const iconImg = document.getElementById('icon');
const cityName = document.getElementById('cityName');

myBtn2.addEventListener('click', getPosition)
// myBtn.addEventListener('click', getWeather)

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        let tempKelvin = data.main.temp;
        let tempCel = tempKelvin - 273.15
        temp.textContent = `Temperature: ${tempCel.toFixed(2)} C`
        maxTemp.textContent = `Max Temp: ${data.main.temp_max}`
        minTemp.textContent = `Min Temp: ${data.main.temp_min}`
        humidity.textContent = `Humidity: ${data.main.humidity}`
        cityName.textContent = data.name;
        description.innerHTML = data.weather[0].description
        let icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
        iconImg.innerHTML = `<img src="${iconUrl}" width="150px" />`
        document.getElementById('box').style.display = 'block'
    })

    .catch(error => {
        console.error('Error:', error);
      });
  }
  
function getPosition(){

    if(city.value != ''){
        let longitude;
        let latitude;
        let finalCity = city.value
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${finalCity}&limit=1&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            latitude = data[0].lat;
            longitude = data[0].lon;
            console.log(latitude);
            console.log(longitude)
            getWeather(latitude,longitude)
            city.value = ''
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }else{
        alert('enter a city')
    }
   

    
  }

 