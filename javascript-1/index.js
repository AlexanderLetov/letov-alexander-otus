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
Пример 1:
	Группа рекомендаций 1 - ["a", "b", "c"]. Покупка "a" содержится в списке 2, поэтому весь список 2 может быть добавлен в рекомендации.
	Группа рекомендаций 2 - ["d", "e"].
Ответ 1:
	["a", "b", "c"]
Пример 2:
	Входные данные: [ ["q", "w", 'a'], ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"]]
Ответ 2: 
	["a", "b", "c", "e", "q", "r", "w"] - это максимальная по пересечениям группа.
	Можно видеть, что первый массив пересекается со всеми остальными, и потому результат является всем множеством значений.
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
	let indexBigItem = Recommendations.map(a=>a.length).indexOf(Math.max(...Recommendations.map(a=>a.length)))
	let maxLengthRec = Recommendations[indexBigItem].length; // максимальная длина массива.

	recommendSort = Recommendations.filter(it=>it.length == maxLengthRec); // Только самые длинные
	
	let recommendSort_Alphaber = recommendSort.sort(function(a, b){
		if(a < b) { return -1; }
		if(a > b) { return 1; }
		return 0;
	})[0]

	return recommendSort_Alphaber.sort((a, b) => a.localeCompare(b)); // Сортируем по алфавиту
}

maxItemAssociation([ ["q", "w", 'a'], ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"]]);
// >>> ["a", "b", "c", "e", "q", "r", "w"]
maxItemAssociation([['q', 'w'],['a', 'b'],['a', 'c'],['q', 'e']]);
// >>> ["a", "b", "c"]