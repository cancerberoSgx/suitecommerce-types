# for SCA gulp-local or gulp- unit-test:
# npx gulp unit-test --modules SCTypesFrontEndCoreSCAUnitTest --dont-exit
OUTPUT_FOLDER=/home/sg/awa/kilimanjaro/Modules/suitecommerce/SCTypesFrontEndCoreSCAUnitTest@1.0.0
EXTRA_SCTSC_PARAMS="--addExtraAmdDependendenciesForSCAUnitTests Backbone.View.Plugin.DebugTemplateName --formatJsOutput --dependencyPrefix SCTypesCoreSpec_"


rm -rf $OUTPUT_FOLDER/* && \
npm run clean && \
npx tsc && \
mkdir -p  $OUTPUT_FOLDER && \
node node_modules/.bin/sc-tsc \
  --tsconfigFilePath ./tsconfig.json \
  --addTslibJsInFolder $OUTPUT_FOLDER/src/JavaScript --debug \
  --outputFolder $OUTPUT_FOLDER \
  $EXTRA_SCTSC_PARAMS \
  && \
# mv $OUTPUT_FOLDER/src/* $OUTPUT_FOLDER && \
# rm -rf $OUTPUT_FOLDER/src/  && \
cp -r src/ns.package.json src/Sass src/Templates $OUTPUT_FOLDER/src && \
mv $OUTPUT_FOLDER/src/* $OUTPUT_FOLDER && \
echo "end" && \
echo $?