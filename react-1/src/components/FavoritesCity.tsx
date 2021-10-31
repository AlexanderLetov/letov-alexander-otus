import { useState, useEffect } from 'react';
import Select, { Options } from 'react-select'
import { allCity } from '../services/allCity'
import { ICity } from '../interfaces/ICity'

export default function FavoritesCity() {
   const [favoritesCityData, setFavoritesCityData] = useState([] as ICity[]);

   useEffect(() => {
      let favoritesCity = localStorage.getItem('favoritesCity');
      if (favoritesCity != null && favoritesCity != "") {
         let _favoritesCity = JSON.parse(favoritesCity);
         setFavoritesCityData(_favoritesCity);
      }
   }, [])

   const change = (options: ICity[]) => {
      localStorage.setItem('favoritesCity', JSON.stringify(options));
      setFavoritesCityData(options);
   }

   return (
      <div>
         <h4>
            Избранные города
         </h4>
         <div>
            <Select
               options={allCity}
               placeholder="Выберите значение"
               onChange={(option) => change(option as ICity[])}
               isMulti={true}
               value={favoritesCityData}
            />
         </div>
      </div>
   )
}