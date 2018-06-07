const { walkSync, walkSync2, walkSync3, walkSync4 } = require('@lerna-test/util');

const fs = require('fs');
const path = require('path');

//const test = walkSync('../');
const dir = path.join(__dirname, 'test1');
console.log(dir);
// const contents = fs.readdirSync(dir);
// console.log(contents)

// let walkDir = d => fs.statSync(d).isDirectory() ? fs.readdirSync(d).map(item => {
//     console.log(path.join(d, item))
//     let x = walkDir(path.join(d, item))
//     return [].concat(path.join(d, item), x);
// }) : d


const isDirectory = source => fs.statSync(source).isDirectory();
const getDirectories = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);
const getDirectoriesRecursive = source => getDirectories(source).reduce((list, subDir) => list.concat(subDir, getDirectoriesRecursive(subDir)), []);

//const getDirectoriesRecursive = source => fs.readdirSync(source).filter(item => fs.statSync(path.join(source, item)).isDirectory()).reduce((list, item) => list.concat(path.join(source, item), getDirectoriesRecursive(path.join(source, item))), [])

// const getDirectories = source = fs.readdirSync(source).filter(item => {
//     if (isDirectory(item))
//         getDirectories(item);
//     return isDirectory(item);
// })

// let walkDir = d => fs.statSync(d).isDirectory() ? fs.readdirSync(d).map(item => {
//     let x = walkDir(path.join(d, item))
//     return [].concat(path.join(d, item), x)
// }).reduce((flat, flatten) => flat.concat(flatten), []) : d;

//List all files recursively (but no directories)
//const walkDir = (d) => fs.statSync(d).isDirectory() ? fs.readdirSync(d).map(f => walkDir(path.join(d, f))) : d;
// list all files recursively (but no directories) and return flat list
//const walkDir = (d) => fs.statSync(d).isDirectory() ? fs.readdirSync(d).reduce((list, f) => list.concat(walkDir(path.join(d, f))), []) : d;

//const walkDir = (d) => fs.statSync(d).isDirectory() ? fs.readdirSync(d).reduce((list, f) => list.concat(walkDir(path.join(d, f))), []) : d;

//let x = (d) => fs.readdirSync(d).map(f => f)
// .map(f => {
//     return fs.readdirSync(path.join(d, f))
// })

// let y = fs.readdirSync(dir).reduce((flat, f) => {
//     return flat.concat(fs.readdirSync(path.join(dir, f)))
// }, [])

//console.log(`\nwalkdir: ${JSON.stringify(walkDir(dir))}`)
// console.log(`\nx: ${x(dir)}`)
// console.log(`\ny: ${y}`)
console.log(`get dirs: ${JSON.stringify(getDirectoriesRecursive(dir))} `);
//console.log(`get dirs: ${JSON.stringify(getDirectoriesRecursive(dir))} `);
//const test = walkSync(dir);
//console.log(test);