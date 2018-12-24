// require('minimist')(process.argv.slice(2));

import minimist from 'minimist' 

const args = minimist((process.argv.slice(2)))

const config=args
console.log(args);
