import { ImportDeclaration } from "ts-simple-ast";
import { CustomImportSpecifier, IgnoreImportSpecifier } from "./import2define";
import { parseJSONFile } from "misc-utils-of-mine";
import { join, dirname } from "path";
import { getPathRelativeToProjectFolder } from "../util/misc";
import { ls } from "shelljs";
import { readFileSync } from "fs";

export const defaultCustomImportSpecifiers: CustomImportSpecifier[] = [

  // when user import {Foo} from 'sc-types-frontend' it could be two things: just a type in which case we ignore the import by returning undefined, or some special names that really return SC objects
  {
    predicate: (id: ImportDeclaration, ni: string) => ['sc-types-frontend', 'sc-types-frontend-core'].includes(id.getModuleSpecifier().getLiteralText()),
    getImportSpecifier: (id: ImportDeclaration, ni: string) => suiteCommerceSpecifiers[ni]
  },

  {
    predicate: (id: ImportDeclaration, ni: string) => id.getModuleSpecifier().getLiteralText() === 'sc-types-frontend-extras',
    getImportSpecifier: (id: ImportDeclaration, ni: string) => ni
  },  
  
  // user can use react types like ChangeEvent - in that case we import a dummy module
  {
    predicate: (id: ImportDeclaration, ni: string) => id.getModuleSpecifier().getLiteralText() === 'react',
    getImportSpecifier: (id: ImportDeclaration, ni: string) => 'Backbone'
  },

  // when user import template from './some_template.tpl' we return just the file name 'some_template.tpl'
  {
    predicate: (id: ImportDeclaration, ni: string) => id.getModuleSpecifier().getLiteralText().endsWith('.tpl'),
    getImportSpecifier: (id: ImportDeclaration, ni: string) => {
      const name = id.getModuleSpecifier().getLiteralText();
      return name.substring(name.lastIndexOf('/') + 1, name.length);
    }
  }
]

export const defaultIgnoreImportSpecifiers: IgnoreImportSpecifier[] = [
  // {
  //   predicate: (id: ImportDeclaration) => id.getModuleSpecifier().getLiteralText() === 'sc-types-frontend'
  // }
];


const suiteCommerceSpecifiers: { [name: string]: string } = {
  'Utils': 'Utils',
  'BackboneView': 'Backbone.View',
  'Backbone': 'Backbone',
  'BackboneModel': 'Backbone.Model',
  'BackboneCollection': 'Backbone.Collection',
  'BackboneRouter': 'Backbone.Router',
  'BackboneCachedCollection': 'Backbone.CachedCollection',
  'BackboneCachedModel': 'Backbone.CachedModel',
  'jQuery': 'jQuery',
  'underscore': 'underscore',
  'PluginContainer': 'PluginContainer',
  'SCAUnitTestHelper': 'UnitTestHelper',
  'SCAUnitTestHelperPreconditions': 'UnitTestHelper.Preconditions'
}

let  suiteCommerceExtraModules : {name: string, text: string }[]


/** if project has dependency 'sc-types-frontend-extras' then it will copy certain compiled extra modules from there to tslib.js like 'JSXView.js', 'ReactLike.js' */
export function getSuiteCommerceExtraModules(): { name: string, text: string }[] {
  if(suiteCommerceExtraModules){
    return suiteCommerceExtraModules
  }
  const base = join('node_modules', 'sc-types-frontend-extras', 'compiled', 'src', 'jsx')
  suiteCommerceExtraModules = ls(base)
    .filter(f => f.endsWith('.js') && f !== 'index.js')
    .map(name => ({ name, text: readFileSync(join(base, name)).toString() }))
    .concat([
      {
        name: 'Backbone.Collection.js',
        text: `define('Backbone.Collection', ['Backbone'], function(Backbone) {
      return Backbone.Collection
    })`},
      {
        name: 'Backbone.Router.js',
        text: `define('Backbone.Router', ['Backbone'], function(Backbone) {
      return Backbone.Router
    })`}
    ])
    return suiteCommerceExtraModules
}
