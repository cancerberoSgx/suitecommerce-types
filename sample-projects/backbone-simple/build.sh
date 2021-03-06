# this command will deploy to a new SCA module /Modules/suitecommerce/BackboneSimpleTest1@1.0.0 so from there you can enter `npx gulp unit-test --modules BackboneSimpleTest1 --dont-exit` tu run its tests

# CWD=`pwd`
# #first compile dependencies
# ROOT=/home/sg/git/suitecommerce-types
# cd /home/sg/git/suitecommerce-types
# npm run build
# cd $CWD


# for SCA gulp-local or gulp- unit-test:
# example gulp-unit-test command:  npx gulp unit-test --modules BackboneSimpleTest1 --dont-exit
OUTPUT_FOLDER=/home/sg/awa/kilimanjaro/Modules/suitecommerce/BackboneSimpleTest1@1.0.0
EXTRA_SCTSC_PARAMS="--addExtraAmdDependendenciesForSCAUnitTests Backbone.View.Plugin.DebugTemplateName --formatJsOutput"


# for SCA production or extensions:
# OUTPUT_FOLDER=/home/sg/awa/ext/Workspace/Test3/Modules/BackboneSimpleTest1
# EXTRA_SCTSC_PARAMS=" "


rm -rf $OUTPUT_FOLDER/* && \
npm run clean && \
npx tsc && \
mkdir -p  $OUTPUT_FOLDER && \
node node_modules/.bin/sc-tsc \
  --tsconfigFilePath ./tsconfig.json \
  --addTslibJsInFolder $OUTPUT_FOLDER \
  --outputFolder $OUTPUT_FOLDER \
  $EXTRA_SCTSC_PARAMS \
  && \
mv $OUTPUT_FOLDER/src/* $OUTPUT_FOLDER && \
rm -rf $OUTPUT_FOLDER/src/  && \
cp -r src/ns.package.json src/Sass src/Templates $OUTPUT_FOLDER && \
mv $OUTPUT_FOLDER/tslib.js $OUTPUT_FOLDER/JavaScript && \
rm -rf $OUTPUT_FOLDER/../../manifest.json && \
cp ./manifest.json $OUTPUT_FOLDER/../.. && \
echo "end" && \
echo $?