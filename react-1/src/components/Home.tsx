import React, { useState, useEffect } from 'react';
import { getWeaterCityByID } from '../services/get-data';
import { Card, CardGroup, Button } from 'react-bootstrap'
import { ICity } from '../interfaces/ICity'
import CityGroup from './CityGroup'

export default function Home() {
   const [cityInfo, setCityInfo] = useState({} as any);
   const [favoritesCity, setFavoritesCity] = useState([] as ICity[]);
   const [popularCity] = useState<ICity[]>([
      { value: 2643743, label: "London" },
      { value: 2643123, label: "Manchester" },
      { value: 2644210, label: "Liverpool" }]);


   useEffect(() => {
      let currentCity = localStorage.getItem('currentCity');
      let homeCityData = localStorage.getItem('HomeCityData');
      let favoritesCity = localStorage.getItem('favoritesCity');

      if (currentCity != null && currentCity != "") {
         let cityId = Number(currentCity);

         if (homeCityData != null && homeCityData != "") {
            let cityData = JSON.parse(homeCityData);
            if (cityData.id === currentCity) {
               setCityInfo(cityData);
            } else {
               loadCityInfo(cityId);
            }
         } else {
            loadCityInfo(cityId);
         }
      }

      if (favoritesCity != null && favoritesCity != "") {
         let _favoritesCity = JSON.parse(favoritesCity);
         setFavoritesCity(_favoritesCity);
      }
   }, [])

   const loadCityInfo = async (id: number) => {
      let cityData = await getWeaterCityByID(id);
      setCityInfo(cityData);
      localStorage.setItem('HomeCityData', JSON.stringify(cityData));
   }

   return (
      <div>
         <div>
            {(cityInfo.main == null) &&
               <div>
                  <h4>Текущий город не выбран</h4>
                  <h6>Выбор города доступен на <a href='/change-current-city'>этой странице</a></h6>
               </div>
            }
            {(cityInfo.main != null) &&
               <div>
                  <h4>
                     Текущий город - {cityInfo.name} ( <a href={`/city/${cityInfo.id}`}>Подробная информация</a> )
                  </h4>
                  <p>сейчас: {cityInfo.main.temp} </p>
                  <p>ощущается как: {cityInfo.main.feels_like} </p>
               </div>
            }

         </div>
         <div>

            {(favoritesCity.length > 0) &&
               <>
                  <h4>
                     Избранные города:
                  </h4>
                  <CityGroup
                     data={favoritesCity}
                  />
               </>
            }

            {(favoritesCity.length === 0) &&
               <div>
                  <h4>Избранные города не выбраны</h4>
                  <h6>Выбор городов доступен на <a href='/favorites-city'>этой странице</a></h6>
               </div>
            }
         </div>
         <div>
            <h4>
               Популярные города:
            </h4>
            <CityGroup
               data={popularCity}
            />
         </div>

      </div>
   )
}