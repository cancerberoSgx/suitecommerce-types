SCA module with unit tests that checks that these typings and the transformation works in SCA alog an application as expected

sh build.sh will generate a SCA module to OUTPUT_FOLDER path (see build.sh)

cd som/sca/folder
npx gulp unit-test --modules SCTypesFrontEndCoreSCAUnitTest --dont-exit
firefox http://localhost:7777/test1.html