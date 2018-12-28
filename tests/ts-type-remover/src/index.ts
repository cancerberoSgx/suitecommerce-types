import { SourceFile, TypeGuards, SyntaxKind } from 'ts-simple-ast'

export function removeTypes(file: SourceFile): string {
  const allIds = file.getDescendantsOfKind(SyntaxKind.Identifier).filter(i=>{
    i.findReferences().forEach(r=>{
      const definition = r.getDefinition()
      const declaration = definition.getDeclarationNode()
      const name = i.getText()
      console.log({name, definition: definition && definition.getContainerKind(), declaration: declaration && declaration.getText()});
      
      TypeGuards.isTypeNode(i)
    })
  })
  
  // let f  
  // debugger
  // allIds.forEach(i => {
  //   i.rename('any')
    
  // })

  // const ss = f.getText()
  debugger
  return ''
} 