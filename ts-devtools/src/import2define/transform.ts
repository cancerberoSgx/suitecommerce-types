import * as ts from "typescript";

export const transformer = <T extends ts.Node>(context: ts.TransformationContext) => {
  return (rootNode: T) => {
    function visit(node: ts.Node): ts.Node {
      node = ts.visitEachChild(node, visit, context);
      // in a property access expression like "foo.bar" "foo" is the expression and "bar" is the name : 
      // we replace the whole expression with just node.expression in the case name is "accessorToBeRemoved"
      if (ts.isPropertyAccessExpression(node) && node.name &&
        node.name.getText() === 'accessorToBeRemoved') {
        return node.expression
      }
      return node;
    }
    return ts.visitNode(rootNode, visit);
  }
}
  