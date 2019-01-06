this is a sample extension using ts-devtools and sc-types-frontend that accomplishes two nice things:

first is using JavaScript/ReactList.ts utility to render JSX (see JavaScript/Main.tsx) - is not react, just tsx/jsx rendering. needs @types/react for bindings. 

Then its able to run in SCA unit-tests, see build.sh, basically can be compiled into a SCA module folder using ts-devtools. It has a ns.package.json and Tests/ files with an entry point. Tests verify that JSX and Deferred with await/async works in the real browser 

See sample-projects/tsx-test/SCA_module_output/MyCoolModule@1.0.0 for the output generated code