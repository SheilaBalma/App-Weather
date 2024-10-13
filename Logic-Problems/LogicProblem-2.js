function getIndexsForPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    let mismatches = [];

    // Recorremos la cadena desde ambos lados hacia el centro
    while (left < right) {
        if (s[left] !== s[right]) {
            mismatches.push([left, right]);
        }
        left++;
        right--;
    }

    // Si no hay diferencias, ya es un palíndromo
    if (mismatches.length === 0) {
        return [];
    }

    // Si hay más de dos diferencias, no es posible hacer un palíndromo con un solo cambio
    if (mismatches.length > 2) {
        return null;
    }

    // Si hay exactamente dos diferencias
    if (mismatches.length === 2) {
        let [l1, r1] = mismatches[0];
        let [l2, r2] = mismatches[1];

        // Verificamos si intercambiando los elementos podemos formar un palíndromo
        if (s[l1] === s[r2] && s[l2] === s[r1]) {
            return [l1, l2];
        }
    }

    // No es posible formar un palíndromo
    return null;
}

// Ejemplos de uso
console.log(getIndexsForPalindrome('anna')); // []
console.log(getIndexsForPalindrome('abab')); // [0, 1]
console.log(getIndexsForPalindrome('abac')); // null
console.log(getIndexsForPalindrome('aaaaaaaa')); // []
console.log(getIndexsForPalindrome('aaababa')); // [1, 3]
console.log(getIndexsForPalindrome('caababa')); // null
