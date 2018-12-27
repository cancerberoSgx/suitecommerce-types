# this command will deploy to a new SCA module /Modules/suitecommerce/MyCoolModule@1.0.0 so from there you can enter `npx gulp unit-test --modules MyCoolModule --dont-exit` tu run its tests

OUTPUT_FOLDER=/home/sg/awa/kilimanjaro/Modules/suitecommerce/MyCoolModule@1.0.0
rm -rf $OUTPUT_FOLDER/* && \
npm run clean && \
tsc && \
mkdir -p  $OUTPUT_FOLDER && \
node node_modules/.bin/sc-tsc --tsconfigFilePath ./tsconfig.json --addTslibJsInFolder $OUTPUT_FOLDER/ --outputFolder  $OUTPUT_FOLDER && \
mv $OUTPUT_FOLDER/src/* $OUTPUT_FOLDER && \
rm -rf $OUTPUT_FOLDER/src/
cp src/ns.package.json  $OUTPUT_FOLDER
mv $OUTPUT_FOLDER/tslib.js $OUTPUT_FOLDER/JavaScript

echo "end"
echo $?