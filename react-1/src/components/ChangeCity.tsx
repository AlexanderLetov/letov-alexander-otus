import { useState, useEffect } from 'react';
import Select from 'react-select'
import { allCity } from '../services/allCity'
import { ICity } from '../interfaces/ICity'
import { useHistory } from "react-router-dom"

export default function ChangeCity() {
   let history = useHistory();
   const [currCityID, setCurrCityID] = useState(0)

   useEffect(() => {
      let currentCity = localStorage.getItem('currentCity');
      if (currentCity != null && currentCity != "") setCurrCityID(Number(currentCity));
   }, [])

   const change = (option: ICity) => {
      setCurrCityID(option.value || 0);
      localStorage.setItem('currentCity', String(option.value));
      history.push("/");
   }

   return (
      <div>
         <h4>
            Смена текущего города
         </h4>
         <div>
            <Select
               options={allCity}
               placeholder="Выберите значение"
               onChange={(option) => change(option as ICity)}
               value={allCity.filter(option => option.value === currCityID)}
            />
         </div>
      </div>
   )
}