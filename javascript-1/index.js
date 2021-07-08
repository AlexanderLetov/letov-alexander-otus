/*
Задача про список рекомендаций maxItemAssociation
Цель:
	Написать алгоритм для нахождения максимального списка рекомендаций.
	Написать функцию maxItemAssociation(),
	получающую исторические данные покупок пользователей и возвращающую максимальный список рекомендаций.
	Входные данные - массив исторических покупок пользователей [["a", "b"], ["a", "c"], ["d", "e"]].
	Пользователь 1 купил продукты "a" и "b".
	Пользователь 2 купил продукты "a", "c".
	Пользователь 3 купил продукты "d", "e".
	>>> Надо найти максимальную группу рекомендаций.
	Группа рекомендаций - это продукты, которые был куплены другими пользователями при условии, если они пересекаются с исходным списком.
	Если количество рекомендаций в группах одинаковое - вернуть первую группу, из отсортированных в лексикографическом порядке.
Решение:
	Группа рекомендаций 1 - ["a", "b", "c"]. Покупка "a" содержится в списке 2, поэтому весь список 2 может быть добавлен в рекомендации.
	Группа рекомендаций 2 - ["d", "e"].
Ответ:
	["a", "b", "c"]
*/

function maxItemAssociation(arr){
	let Recommendations = []; // Рекомендации
	let buyUsers = arr;

	buyUsers.forEach((buy) => {
		let _buyUsers = buyUsers.filter(item => item != buy); // Выкидываем текущую и идентичные покупки
		let _oneBuyArr = buy; // текущая покупки пользователя

		// ищем были ли совпадения по покупкам у других людей
		buy.forEach((oneBuy)=>{
			_buyUsers.forEach((_buy)=>{
				// Ищем текущую покупку в другой покупке
				_buy.forEach((_buyItem) => {
					if(_buyItem == oneBuy) {
						_oneBuyArr = buy; 
						let similarBuy = _oneBuyArr.concat(_buy); // добавялем к ней найденную группу покупок
						similarBuy = similarBuy.filter((item, pos) => similarBuy.indexOf(item) === pos); // оставляем уникальные
						
						_oneBuyArr = similarBuy; // закидыаем в глобальный массив
					}
				})
			})
		})

		// Закидываем в глобальный список рекомендаций если что то находилось
		Recommendations.push(_oneBuyArr);
	})

	// Анализируем список рекомендаций
	let recommendSort = Recommendations.sort( function (a, b) {
			return b.length - a.length;
	})[0]; // Выбираем первый самый длинный

	let recommendSort_Alphaber = recommendSort.sort((a, b) => a.localeCompare(b)); // Сортируем по алфавиту

	return recommendSort_Alphaber;
}

maxItemAssociation([["a", "b"], ["a", "c"], ["d", "e"]]); 
// >>>  ["a", "b", "c"]
maxItemAssociation([["a", "e"], ["a", "c"], ["d", "e"]]);
// >>> ["a", "d", "e"]
maxItemAssociation([["a", "e", "d"], ["a", "c"], ["d", "e"]]);
// >>> ["a", "c", "d", "e"]