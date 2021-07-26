const getPath = (val) => {
    if (val == '' || val == null) return '';
    // У текущего элемента есть id = возвращаем
    if (val.id) return `#${val.id}`; 
    
    // Нету => строим дерево парентов
    let elemetsArr = [];
    elemetsArr.push(val);
    
    let parent = val.parentElement;
    while (parent) {
        elemetsArr.push(parent);
        parent = parent.parentElement;
    }
    
    // var parent = val.parentNode;
    // var index = parent.children.indexOf(child)
    // var index = Array.prototype.indexOf.call(parent.children, val);
    
    let pathArr = []; // Путь до элемента
    let idIndex = elemetsArr.findIndex(element=>element.id);
    if (idIndex > -1) {
        // Нашёлся id в цепочке
        for (let index = 0; index < idIndex+1; index++) {
            const element = elemetsArr[index];
            if (element.tagName.toLowerCase() == "body" || element.tagName.toLowerCase() == "html") break;

            // соседи и tagName
            let idInNeighbors = Array.prototype.indexOf.call(element.parentElement.children, element); 
            if (idInNeighbors != 0)  
                pathArr.push(`${element.tagName}:nth-child(${idInNeighbors+1})`); // соседи есть
            else  
                pathArr.push(element.tagName); // соседей нету

            // классы
            if (element.className != null || element.className != "") {
                let className = element.className;
                className = className.split(" ").filter(el => el != "").map(el => `.${el}`).join(' > ');

                pathArr.push(className);
            }

            if (index == idIndex){
                pathArr.push(`#${element.id}`);
            }
        }
    } else {
        // Составляем дерево классов и тэгов
        for (let index = 0; index < elemetsArr.length; index++) {
            const element = elemetsArr[index];
            if (element.tagName == "BODY" || element.tagName == "HTML") break;

            // соседи и tagName
            let idInNeighbors = Array.prototype.indexOf.call(element.parentElement.children, element);
            if (idInNeighbors != 0)  
                pathArr.push(`${element.tagName}:nth-child(${idInNeighbors+1})`); // соседи есть
            else  
                pathArr.push(element.tagName); // соседей нету

            // классы
            if (element.className != null || element.className != "") {
                let className = element.className;
                className = className.split(" ").filter(el => el != "").map(el => `.${el}`).join(' > ');

                pathArr.push(className);
            }
        }
    }

    return pathArr.filter(el => el).reverse().join(' > ');
}

module.exports = getPath;


// Здравствуйте! А что если рядом с элементом будут находиться другие элементы на том же уровне? и мы захотим не первый параграф найти, а пятый?
// Ваши тесты тоже корректно отработают и в этом случае, поэтому я хотел бы, чтобы Вы добавили поддержку nth-child и написали более сложные тесты для проверки различных кейсов