Runs SCA gulp unit-test command from CLI (npm test)

Usage:

```
npm i sca-unit-test
npx sca-unit-test --puppeteerNodeModulesPath /home/sg/git/WASM-ImageMagick/ --path ~/awa/kilimanjaro/ --modules SCTypesFrontEndCoreTests
```

 * executes gulp unit-test command and wait til it's ready
 * then uses jasmine-puppeteer-results to assert test result
