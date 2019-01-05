const fs = require('fs');

const file2 = 'ts-devtools/tmp/test2.txt';

const file1 = 'ts-devtools/tmp/test1.txt';
fs.writeFileSync(file2, 'test2')
fs.writeFileSync(file1, 'test1')

console.log(`Watching for file changes on ${file2}`);

setTimeout(() => {
  fs.writeFileSync(file2, 'test22')
  fs.writeFileSync(file1, 'test11')
}, 1000);

fs.watch(file2, (event, filename) => {
  if (filename) {
    console.log(`${filename} file Changed ${event}`);
  }
});

fs.watch(file1, (event, filename) => {
  if (filename) {
    console.log(`${filename} file Changed ${event}`);
  }
});
