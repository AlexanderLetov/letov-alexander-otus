const getPath = (val) => {
    if (val == '' || val == null) return '';
    if (val.id) return `#${val.id}`; 
    
    const elemetsArr = [];
    elemetsArr.push(val);
    
    let parent = val.parentElement;
    while (parent) {
        if (parent.tagName == "BODY" || parent.tagName == "HTML") break;
        elemetsArr.push(parent);
        parent = parent.parentElement;
    }
    
    const pathArr = [];
    let idIndex = elemetsArr.findIndex(element=>element.id);
    if (idIndex > -1) {
        for (let index = 0; index < idIndex+1; index++) {
            const element = elemetsArr[index];

            let idInNeighbors = Array.prototype.indexOf.call(element.parentElement.children, element); 
            if (idInNeighbors != 0)  
                pathArr.push(`${element.tagName}:nth-child(${idInNeighbors+1})`); 
            else  
                pathArr.push(element.tagName);

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
        for (let index = 0; index < elemetsArr.length; index++) {
            const element = elemetsArr[index];

            let idInNeighbors = Array.prototype.indexOf.call(element.parentElement.children, element);
            if (idInNeighbors != 0)  
                pathArr.push(`${element.tagName}:nth-child(${idInNeighbors+1})`);
            else  
                pathArr.push(element.tagName); 

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