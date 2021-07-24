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
    
    
    let pathArr = []; // Путь до элемента
    let idIndex = elemetsArr.findIndex(element=>element.id);
    if (idIndex > -1) {
        // Нашёлся id в цепочке
        for (let index = 0; index < idIndex+1; index++) {
            const element = elemetsArr[index];
            if (element.tagName.toLowerCase() == "body" || element.tagName.toLowerCase() == "html") break;

            pathArr.push(element.tagName)
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

            pathArr.push(element.tagName)
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