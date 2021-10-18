const apiKey = '1ef5e6cadd22722a412aba3cc26b4aea';

// export const getWeaterCurrSity = async () => {
//    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}`);
//    let json = response.json();
//    return json;
// }

export const getWeaterCityByID = async (id: number) => {
   let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${apiKey}`);
   let json = response.json();
   return json;
}

export const getWeaterForecast = async (lat: string, lon: string) => {
   let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`);
   let json = response.json();
   return json;
}
