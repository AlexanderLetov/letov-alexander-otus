import { useState, useEffect } from 'react';
import { getWeaterCityByID } from '../services/get-data';
import { Card, CardGroup, Button } from 'react-bootstrap'

export default function Home() {
   const [cityInfo, setCityInfo] = useState({} as any);

   useEffect(() => {
      let currentCity = localStorage.getItem('currentCity');
      let homeCityData = localStorage.getItem('HomeCityData');

      if (currentCity != null && currentCity != "") {
         let cityId = Number(currentCity);

         if (homeCityData != null && homeCityData != "") {
            let cityData = JSON.parse(homeCityData);
            if (cityData.id == currentCity) {
               setCityInfo(cityData);
            } else {
               loadCityInfo(cityId);
            }
         } else {
            loadCityInfo(cityId);
         }
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
                  <h5>Текущий город не выбран.</h5>
                  <h6>Выбор города доступен на <a href='/change-current-city'>этой странице</a></h6>
               </div>
            }
            {(cityInfo.main != null) &&
               <div>
                  <h4>
                     Текущий город - {cityInfo.name}
                  </h4>
                  <p>сейчас: {cityInfo.main.temp} </p>
                  <p>ощущается как: {cityInfo.main.feels_like} </p>
               </div>
            }

         </div>
         <div>
            <h4>
               Популярные города:
            </h4>
            <CardGroup>
               <Card style={{ width: '18rem' }}>
                  <Card.Body>
                     <Card.Title>London</Card.Title>
                     <Button variant="primary" href="/city/2643743" >Перейти к городу</Button>
                  </Card.Body>
               </Card>
               <Card style={{ width: '18rem' }}>
                  <Card.Body>
                     <Card.Title>Berlin</Card.Title>
                     <Button variant="primary" href="/city/2950158" >Перейти к городу</Button>
                  </Card.Body>
               </Card>
               <Card style={{ width: '18rem' }}>
                  <Card.Body>
                     <Card.Title>Moscow</Card.Title>
                     <Button variant="primary" href="/city/5202009" >Перейти к городу</Button>
                  </Card.Body>
               </Card>
               <Card style={{ width: '18rem' }}>
                  <Card.Body>
                     <Card.Title>Beijing</Card.Title>
                     <Button variant="primary" href="/city/1816670" >Перейти к городу</Button>
                  </Card.Body>
               </Card>
               <Card style={{ width: '18rem' }}>
                  <Card.Body>
                     <Card.Title>Washington</Card.Title>
                     <Button variant="primary" href="/city/2634715" >Перейти к городу</Button>
                  </Card.Body>
               </Card>
            </CardGroup>
         </div>

      </div>
   )
}