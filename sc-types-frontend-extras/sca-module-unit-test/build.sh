# for SCA gulp-local or gulp- unit-test:
# npx gulp unit-test --modules SCTypesFrontEndExtrasSCAUnitTest --dont-exit
OUTPUT_FOLDER=/home/sg/awa/kilimanjaro/Modules/suitecommerce/SCTypesFrontEndExtrasSCAUnitTest@1.0.0
EXTRA_SCTSC_PARAMS="--addExtraAmdDependendenciesForSCAUnitTests Backbone.View.Plugin.DebugTemplateName --formatJsOutput"

rm -rf $OUTPUT_FOLDER/* && \
npm run clean && \
npx tsc && \
mkdir -p  $OUTPUT_FOLDER && \
node node_modules/.bin/sc-tsc \
  --tsconfigFilePath ./tsconfig.json \
  --addTslibJsInFolder $OUTPUT_FOLDER/extra --debug \
  --outputFolder $OUTPUT_FOLDER \
  $EXTRA_SCTSC_PARAMS \
  && \
# mv $OUTPUT_FOLDER/src/* $OUTPUT_FOLDER && \
cp -r src/ns.package.json $OUTPUT_FOLDER && \
# mv $OUTPUT_FOLDER/extra/*.js $OUTPUT_FOLDER/JavaScript && \
# rm -rf $OUTPUT_FOLDER/src/ $OUTPUT_FOLDER/extra && \
echo "end" && \
echo $?