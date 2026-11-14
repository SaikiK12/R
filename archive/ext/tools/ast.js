const fs = require('fs');
const vm = require('vm');
const acorn = require('acorn');
const escodegen = require('escodegen');
const estraverse = require('estraverse');
const { JSDOM } = require('jsdom');

function deobfuscate(obfuscatedCode) {
  const ast = acorn.parse(obfuscatedCode, { ecmaVersion: 2020 });

  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
  const window = dom.window;
  const document = window.document;
  const context = { ...global, window, document, console };
  const vmContext = vm.createContext(context);

  vm.runInContext(obfuscatedCode, vmContext);

  estraverse.replace(ast, {
    enter: function (node, parent) {
      // Check if the node is a call expression of the specific obfuscated function
      if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name.match(/^__p_\d+.*$/)) {

        // Generate the code to evaluate
        const codeToEvaluate = escodegen.generate(node);
        try {
          // Evaluate the function call within the simulated browser environment
          const evaluatedResult = vm.runInContext(codeToEvaluate, vmContext);
          // Replace the function call with a literal if the result is a string
          if (typeof evaluatedResult === 'string') {
            return { type: 'Literal', value: evaluatedResult };
          }
        } catch (error) {
          console.error(`Error evaluating expression: ${codeToEvaluate}`, error);
        }
      }
    }
  });

  const deobfuscatedCode = escodegen.generate(ast);
  return deobfuscatedCode;
}

const obfuscatedCode = fs.readFileSync('obfuscated.js', 'utf8');

const deobfuscatedCode = deobfuscate(obfuscatedCode);

fs.writeFileSync('deobfuscated.js', deobfuscatedCode, 'utf8');
console.log('Deobfuscated code has been written to deob.js');