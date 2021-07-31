const path = require('path');
const fs = require('fs');

const folders = [];
const find = async(folder) => {
    folders.push(folder);
    let items = await fs.promises.readdir(folder);

    let findFiles = await Promise.all(
        items.map(async item => {
            let _path = path.join(folder, item);
            let check = await fs.promises.stat(_path);

            if (check.isDirectory()) return find(_path);
            if (check.isFile()) return _path;
        }),
    )

    return findFiles.reduce((all, items) => all.concat(items), []);
}

find(__dirname).then(files => {
    const output = { files, dirs: folders };
    console.log(output);
})