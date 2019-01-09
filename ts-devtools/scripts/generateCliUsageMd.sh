echo "### Command line options" > CLI-usage.md && \
npx generate-cli-api-help --input src/compileAndFix/compileAndFix.ts --format markdown --interfaceName AbstractConfig >> CLI-usage.md && \
npx generate-cli-api-help --input src/compileAndFix/compileAndFix.ts  --format markdown --interfaceName CompileAndFixConfig >> CLI-usage.md && \
npx generate-cli-api-help --input src/import2define/import2define.ts --format markdown --interfaceName Import2DefineConfig >> CLI-usage.md