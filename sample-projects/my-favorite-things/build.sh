# for SCA gulp-local or gulp- unit-test:
# npx gulp unit-test --modules my-favorite-things --dont-exit


OUTPUT_FOLDER=/home/sg/awa/kilimanjaro/Modules/suitecommerce/my-favorite-things@1.0.0
# OUTPUT_FOLDER=`pwd`/tmp
EXTRA_SCTSC_PARAMS="--addExtraAmdDependendenciesForSCAUnitTests Backbone.View.Plugin.DebugTemplateName --formatJsOutput --dependencyPrefix MyCompany_"

rm -rf $OUTPUT_FOLDER/* && \
npm run clean && \
npx tsc && \
mkdir -p  $OUTPUT_FOLDER && \
node node_modules/.bin/sc-tsc \
  --tsconfigFilePath ./tsconfig.json \
  --addTslibJsInFolder $OUTPUT_FOLDER/src/extra --debug --printTimes \
  --outputFolder $OUTPUT_FOLDER \
  $EXTRA_SCTSC_PARAMS \
  && \
# mv $OUTPUT_FOLDER/src/* $OUTPUT_FOLDER && \
cp -r build/ns.package.json $OUTPUT_FOLDER && \
# mv $OUTPUT_FOLDER/extra/*.js $OUTPUT_FOLDER/JavaScript && \
# rm -rf $OUTPUT_FOLDER/src/ $OUTPUT_FOLDER/extra && \
echo "end" && \
echo $?