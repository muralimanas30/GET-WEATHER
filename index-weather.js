// My Project 94698

const weather_main = document.querySelector(".weather-main");
const weather_form = document.getElementById("weather-form");
const weather_time_zone =document.querySelector(".timeZone");
const weather_reset_button = document.getElementById("weather-reset-button");
// weather_reset_button.addEventListener("onclick" , reset);

weather_reset_button.style.display="none";

const weather_city_img_name = document.querySelector(".city-image");
weather_city_img_name.style.display="none";

weather_form.addEventListener("submit" , (event)=> event.preventDefault());
const weather_search_button = document.getElementById("weather-search-button");

const weather_card = document.querySelector(".weather-card");
weather_card.style.display="none";


const weather_data_details = document.querySelector(".all-weather-data");
weather_data_details.style.display="none";

const trying_for_data_frame = document.querySelector(".trying-for-data");
trying_for_data_frame.style.display="none";

const weather_city_image = document.getElementById("weather-city-image")
const weather_city_name = document.getElementById("weather-city-name");
const weather_temp_display_p = document.querySelector(".tempDisplay")
const weather_humidity_display_p = document.querySelector(".humidityDisplay")
const weather_desc_display_p = document.querySelector(".descDisplay")
const weather_country_display_p = document.querySelector(".countryDisplay")

const weather_city_input = document.getElementById("weather-city-input");

let weather_json;

function getTimeZone(seconds){
    let time_zone="";
    let sign = Math.sign(seconds)?"+":"-";
    let hours = Math.floor(Math.abs(seconds)/3600);
    console.log(hours);

    let minutes = Math.floor((Math.abs(seconds) - hours*3600)/60);
    time_zone = `TIME ZONE - UTC ${sign}  ${String(hours).padStart(2,"0")} : ${String(minutes).padStart(2,"0")} Hrs.`
    console.log(time_zone);
    return time_zone;
}

function try_reset(){
    weather_reset_button.style.display="none";
    weather_search_button.style.display="inline";
    weather_city_input.textContent="";
    weather_card.style.display="none";
    weather_data_details.style.display="none";
    weather_city_image.style.display="none";
    trying_for_data_frame.style.display="none";
}







async function main(){
    let weather_city_text;
    try{
        weather_data_details.style.display="none";
        weather_reset_button.style.display="none";
        weather_city_img_name.style.display="none";
        weather_card.style.display="flex";
        trying_for_data_frame.style.display="block";

        if(weather_city_input.value==""){
            
            trying_for_data_frame.innerHTML=
            "<p>PLEASE PROVIDE A CITY NAME</p>"
            // throw new Error("PLEACE PROVIDE A CITY NAME");
            //invalid cases, error raised
            return;
        }
        
        weather_city_text=weather_city_input.value.toLowerCase().trim();
        console.log(weather_city_text);
       
       
        trying_for_data_frame.innerHTML=
        "<p>TRYING TO GET A WEATHER REPORT.. PLEASE WAIT PATIENTLY 😌🙏 THANKYOU</p>";
        //calling the fetch_weather_data() fn to retreive data from api.
        
        weather_json = await fetch_weather_data(weather_city_text);
        console.log(weather_json);

        data_setter(weather_json);
        }
        catch(error){
            
            weather_data_details.style.display="none";
            weather_city_img_name.style.display="none";
            weather_search_button.style.display="none";
            weather_reset_button.style.display="inline";


            trying_for_data_frame.innerHTML=
            "<p>NO WEATHER DATA EXISTS FOR THE GIVEN CITY, TRY A NEARBY CAPITAL 😌🙏 THANKYOU</p>";
            console.error(error);
        }


}

function give_url(weather_city_text){
    const api_key = "1341799dafeb76f4a071b50e299923b1";
    const api_url=`https://api.openweathermap.org/data/2.5/weather?q=${weather_city_text}&appid=${api_key}`;
    return api_url;
}

async function fetch_weather_data(weather_city_text){
        try{
            const response = await fetch(give_url(weather_city_text));
            console.log(response);
            if(!response.ok){
                throw new Error("COULD NOT FETCH DATA");
             
            }
            else{
                
                return response.json();
            }
    
        }
        catch(error){
            throw new Error("COULD NOT FETCH DATA")
        }
        
}


function data_setter(weather_json){

    weather_search_button.style.display="none";
    
    let weather_country_id;
    if(weather_json.sys.id==undefined)
        weather_country_id=``;
    else{
        weather_country_id=`, ID : ${weather_json.sys.id}`;
    }

    
    trying_for_data_frame.style.display="none";
    // weather_card.style.display="block";

    weather_city_img_name.style.display="flex";
    weather_data_details.style.display="block";
    weather_temp_display_p.innerHTML=
    `TEMPERATURE : ${Number(((weather_json.main.temp)-273).toFixed(1))} °C`;

    weather_humidity_display_p.innerHTML=
    `HUMIDITY : ${Number(weather_json.main.humidity)}`;

    
    
    weather_country_display_p.innerHTML=
    `COUNTRY : ${weather_json.sys.country} ${weather_country_id}`;


    weather_desc_display_p.innerHTML=
    `${weather_json.weather[0].description.toUpperCase()}`;

    weather_city_name.innerHTML = 
    `${weather_json.name.toUpperCase()}`;

    weather_time_zone.innerHTML = 
    `${getTimeZone(weather_json.timezone)}`;

    weather_reset_button.style.display="inline";
    weather_city_image.style.display="flex";

}

