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
    <div id="idTest">
        <p class="aaaaaa">Test</p>
    </div>
</body>
</html>`);
const { document } = window;


test('Првоерка пустого значения', () => {
    expect(getPath('')).toBe('');
});

test('Проверка элемента p', () => {
    let el = window.document.getElementsByTagName('p')[0];
    expect(getPath(el)).toBe('#idTest > DIV > .aaaaaa > P');
});