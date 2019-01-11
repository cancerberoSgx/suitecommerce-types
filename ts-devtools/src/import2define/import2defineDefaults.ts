import { ImportDeclaration } from "ts-simple-ast";
import { CustomImportSpecifier, IgnoreImportSpecifier } from "./import2define";

export const defaultCustomImportSpecifiers: CustomImportSpecifier[] = [

  // when user import {Foo} from 'sc-types-frontend' it could be two things: just a type in which case we ignore the import by returning undefined, or some special names that really return SC objects
  {
    predicate: (id: ImportDeclaration, ni: string) => id.getModuleSpecifier().getLiteralText() === 'sc-types-frontend',
    getImportSpecifier: (id: ImportDeclaration, ni: string) => suiteCommerceSpecifiers[ni]
  },

  // // when user import {Foo} from 'suitecommerce' he wants a native SC type like 'Item.Model'. Is the only way of obtatining these in case 'ts-types-frontend' layer don-t support it.
  // // Important: is not possible to import a name with dots like import {'Item.Model'} from 'suitecommerce' so some man in the middle must map these names somehow... TODO. We could workaround somehow like this: import ItemModel from 'suitecommerce/ItemModel';
  // {
  //   predicate: (id: ImportDeclaration, ni: string) => id.getModuleSpecifier().getLiteralText() === 'suitecommerce',
  //   getImportSpecifier: (id: ImportDeclaration, ni: string) => ni
  // },

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

export const suiteCommerceExtraModules = [
  {
    name: 'Backbone.Collection', 
    text: `define('Backbone.Collection', ['Backbone'], function(Backbone) {
  return Backbone.Collection
})`},
  {
    name: 'Backbone.Router', 
    text: `define('Backbone.Router', ['Backbone'], function(Backbone) {
  return Backbone.Router
})`}
]

// /**hack so SCA unit tests works - workaround for SCA issue with missing dependencies. addTslibAmdDependency() will add this extra SCA dependencies to all modules at the end so we make sure they are loaded / on gulp local / gulp unit-test on SCA */
// export const suiteCommerceExtraDependencies = ['Backbone.View.render']