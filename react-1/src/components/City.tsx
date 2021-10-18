import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { getWeaterCityByID, getWeaterForecast } from '../services/get-data'
var moment = require('moment');

export default function City({ match }: RouteComponentProps) {
   const [currCityID, setCurrCityID] = useState(0);
   const [cityInfo, setCityInfo] = useState({} as any);
   const [forecastInfo, setForecastInfo] = useState({} as any);

   useEffect(() => {
      setCurrCityID(Number((match.params as any).id));
   }, [])

   useEffect(() => {
      if (currCityID != 0) loadCityInfo();
   }, [currCityID])


   const loadCityInfo = async () => {
      let cityData = await getWeaterCityByID(currCityID)
      setCityInfo(cityData);

      let forecastData = await getWeaterForecast(cityData.coord.lat, cityData.coord.lon)
      setForecastInfo(forecastData);
   }

   const normalDate = (dt: Date) => {
      return moment.unix(dt).format("DD.MM.YYYY");
   }

   const forecastList = (forecastInfo.daily || []).map((day: any) =>
      <tr key={day.dt} >
         <td>{normalDate(day.dt)}</td>
         <td>{day.temp.morn}</td>
         <td>{day.temp.day}</td>
         <td>{day.temp.night}</td>
      </tr>
   );

   return (
      <div>
         <h4>
            {cityInfo.name}
         </h4>
         {(cityInfo.main != null) && <div>
            <p>сейчас: {cityInfo.main.temp} </p>
            <p>ощущается как: {cityInfo.main.feels_like} </p>
            <p>сегодня максимум: {cityInfo.main.temp_max} </p>
            <p>сегодня минимум: {cityInfo.main.temp_min} </p>
            <p>давление: {cityInfo.main.pressure} </p>
            <p>влажность: {cityInfo.main.humidity} </p>
         </div>}

         {(forecastInfo.daily != null) &&
            <div>
               <h4>Прогноз на 8 дней:</h4>
               <table className="table">
                  <thead>
                     <tr>
                        <td>Дата</td>
                        <td>Утром</td>
                        <td>Днём</td>
                        <td>Вечером</td>
                     </tr>
                  </thead>
                  <tbody>
                     {forecastList}
                  </tbody>
               </table>
            </div>
         }

      </div>
   )
}