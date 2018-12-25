import { ImportDeclaration } from "ts-simple-ast";
import { CustomImportSpecifier, IgnoreImportSpecifier } from "./import2define";

export const defaultCustomImportSpecifiers: CustomImportSpecifier[] = [

  // when user import {Foo} from 'sc-types-frontend' it could be two things: just a type in which case we ignore the import by returning undefined, or some special names that really return SC objects
  {
    predicate: (id: ImportDeclaration, ni: string) => id.getModuleSpecifier().getLiteralText() === 'sc-types-frontend',
    getImportSpecifier: (id: ImportDeclaration, ni: string) => suitecommerceSpecifiers[ni]
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
];
export const defaultIgnoreImportSpecifiers: IgnoreImportSpecifier[] = [
  // {
  //   predicate: (id: ImportDeclaration) => id.getModuleSpecifier().getLiteralText() === 'sc-types-frontend'
  // }
];


const suitecommerceSpecifiers: {[name: string]: string} = {
  'Utils': 'Utils',
  'BackboneView':'Backbone.View',
  'BackboneModel': 'Backbone.Model',
  'BackboneCollection': 'Backbone.Collection',
  'BackboneRouter': 'Backbone.Router',
}