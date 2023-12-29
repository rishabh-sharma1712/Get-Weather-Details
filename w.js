
function getWeather(){
    event.preventDefault();

    let whichLocation = document.getElementById('location');
    const apiKey= 'a7261702bab34a9d3d8948246b44b48d';
    const location = whichLocation.value;

    if (location == ''){
        alert('enter a location');
        return;
    }else{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if(data['cod'] == 404){
                alert('location not found');
                document.getElementById("informationData").style.display = "none";
                document.getElementById("main").style.height = "150px";
                return;
            }else if(data['cod'] != 200){
                alert('some error occured!');
                document.getElementById("informationData").style.display = "none";
                document.getElementById("main").style.height = "150px";
                return;
            }else{
                const temperature = data.main.temp;
                const {icon} = data.weather[0];

                document.getElementById('locationVal').innerHTML = data.name;
                const tempValue = parseFloat(temperature - 273.15).toFixed(0) + "°c"
                document.getElementById('tempValue').innerHTML = tempValue;
                document.getElementById('percent').innerHTML= data.main.humidity + '%';
                document.getElementById('windSpeed').innerHTML = data.wind.speed + ' m/s';

                const url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                setImage(url);

                document.getElementById("informationData").style.display = "block";
                document.getElementById("main").style.height = "600px";

            }

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(error);
        });
    }
    
}

function setImage(url){
    const wImage = document.getElementById('weatherImg');
    wImage.setAttribute('src', url);
}
