// Función para eleminar los paréntesis en el mensaje final
function decode(s) {
    let stack = [];
    for (let char of s) {
      if (char === ')') {
        let temp = [];
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          temp.push(stack.pop());
        }
        stack.pop();
        stack.push(...temp);
      } else {
        stack.push(char);
      }
    }
    return stack.join('');
  }
  
  // Ejemplos de uso
  const a = decode('hola (odnum)');
  console.log(a); // hola mundo
  
  const b = decode('(olleh) (dlrow)!');
  console.log(b); // hello world!
  
  const c = decode('sa(u(cla)atn)s');
  console.log(c); // santaclaus
  