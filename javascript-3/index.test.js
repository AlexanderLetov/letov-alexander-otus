const getPath = require("./index")
const { JSDOM } = require("jsdom");
const { expect } = require("@jest/globals");
const { window } = new JSDOM(`<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="path2">
        <p class="aaaaaa">Test 1</p>
        <p class="aaaaaa">Test 2</p>
        <p class="aaaaaa find">
            <span>11111111</span>
            <span>22222222</span>
            <span>33333333</span>
        </p>
    </div>
    <div id="idTest">
        <p class="aaaaaa">Test 1</p>
        <p class="aaaaaa">Test 2</p>
        <p class="aaaaaa find2">Test 3</p>
        <p class="aaaaaa">Test 4</p>
        <p class="aaaaaa">Test 5</p>
        <p class="aaaaaa">Test 6</p>
    </div>
</body>
</html>`);
const { document } = window;

describe('Базовые проверки', () => {
    test('Пустая строка', () => {
        expect(getPath('')).toBe('');
        expect(getPath('')).toBeDefined();
    });
    
    test('null', () => {
        expect(getPath(null)).not.toBeNull();
        expect(getPath(null)).not.toBeNaN();
        expect(getPath(null)).not.toBeUndefined();
        expect(getPath(null)).toBeDefined();
    });
})

describe('Проверки на возврат пути', () => {
    test('У элемента есть id', () => {
        let el = document.getElementById('idTest');
        expect(getPath(el)).toBe('#idTest');
    });

    test('Элемент с id в цепочкке', () => {
        let el = document.getElementsByTagName('p')[8];
        expect(getPath(el)).toContain('#idTest'); 
        expect(getPath(el)).toBe('#idTest > DIV:nth-child(2) > .aaaaaa > P:nth-child(6)');
    });
    
    test('Элемент без id в цепочкке', () => {
        let el = document.getElementsByTagName('span')[2];
        expect(getPath(el)).not.toContain('#idTest'); 
        expect(getPath(el)).toBe('.path2 > DIV > .aaaaaa > .find > P:nth-child(3) > SPAN:nth-child(3)');
    });

    test('Возврат части пути', () => {
        let el = document.getElementsByTagName('span')[0];
        expect(getPath(el)).toMatch(/nth-child/);
    });
})

describe('Проверки на невозврат пути', () => {
    test("Сравнение соседних p", () => {
        let pArr = document.querySelectorAll('#idTest > p')
        expect(getPath(pArr[0])).not.toBe(getPath(pArr[1]))
        expect(getPath(pArr[2])).not.toBe(getPath(pArr[3]))
        expect(getPath(pArr[4])).not.toBe(getPath(pArr[5]))
    })

    test("Сравнение div и span", () => {
        let divArr = document.querySelectorAll('div');
        let spanArr = document.querySelectorAll('.path2 > span');
        expect(getPath(divArr[0])).not.toBe(getPath(spanArr[0]))
    })
})