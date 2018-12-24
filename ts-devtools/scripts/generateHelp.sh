echo "export const help = \`" > src/bin/help.ts && \
npx generate-cli-api-help --input src/compileAndFix/compileAndFix.ts --format javascriptStringNoVar --interfaceName AbstractConfig >> src/bin/help.ts && \
npx generate-cli-api-help --input src/compileAndFix/compileAndFix.ts  --format javascriptStringNoVar --interfaceName CompileAndFixConfig >> src/bin/help.ts && \
npx generate-cli-api-help --input src/import2define/import2define.ts --format javascriptStringNoVar --interfaceName Import2DefineConfig >> src/bin/help.ts && \
echo "\`.replace(/\\\\n\\\\n/gm, '')" >> src/bin/help.ts