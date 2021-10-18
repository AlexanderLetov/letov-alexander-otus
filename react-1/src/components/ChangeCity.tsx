import { useState, useEffect } from 'react';
import Select from 'react-select'

const options = [
   { value: 2643743, label: 'London' },
   { value: 2950158, label: 'Berlin' },
   { value: 5202009, label: 'Moscow' },
   { value: 1816670, label: 'Beijing' },
   { value: 2634715, label: 'Washington' },
]

export default function ChangeCity() {
   const [currCityID, setCurrCityID] = useState(0)

   useEffect(() => {
      let currentCity = localStorage.getItem('currentCity');
      if (currentCity != null && currentCity != "") setCurrCityID(Number(currentCity));
   }, [])

   const change = (option: any) => {
      setCurrCityID(option.value);
      localStorage.setItem('currentCity', option.value);
   }

   return (
      <div>
         <h4>
            Смена текущего города
         </h4>
         <div>
            <Select
               options={options}
               placeholder="Выберите значение"
               onChange={change}
               value={options.filter(option => (option as any).value == currCityID)}
            />
         </div>
      </div>
   )
}