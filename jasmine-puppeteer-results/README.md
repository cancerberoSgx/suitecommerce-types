Utility to run a working jasmine HTML tests webpage using puppeteer

 * link puppeteer dependency from another node_modules (so it don't download it each time)
 * simple API and CLI for asserting if a local running jasmine web page tests are green

Usage

```
npm i jasmine-puppeteer-results
npx jasmine-puppeteer-results  --puppeteerNodeModulesPath /home/sg/git/WASM-ImageMagick/ --url http://localhost:7777/test1.html
```

TODO

 * move sca-related things to another project
 * move this project to misc-utils-of-mine-puppeteer 
 * other frameworks than jasmine
 * report errors to CLI