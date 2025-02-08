function gcd(a, b) {
    return b === 0n ? a : gcd(b, a % b);
}

function modInverse(a, m) {
    let [oldR, r] = [a, m];
    let [oldS, s] = [1n, 0n];

    while (r !== 0n) {
        const quotient = oldR / r;
        [oldR, r] = [r, oldR - quotient * r];
        [oldS, s] = [s, oldS - quotient * s];
    }
    return oldS < 0n ? oldS + m : oldS;
}

function modularPow(base, exponent, modulus) {
    if (modulus === 1n) return 0n;
    let result = 1n;
    base = base % modulus;
    while (exponent > 0n) {
        if (exponent % 2n === 1n) result = (result * base) % modulus;
        exponent = exponent >> 1n;
        base = (base * base) % modulus;
    }
    return result;
}

function calculateKeys() {
    const pVal = document.getElementById('p').value;
    const qVal = document.getElementById('q').value;
    const eVal = document.getElementById('e').value;
    const mVal = document.getElementById('M').value;

    // Wait until all inputs are filled before running calculations
    if (!pVal || !qVal || !eVal || !mVal) return;

    const p = BigInt(pVal);
    const q = BigInt(qVal);
    const e = BigInt(eVal);
    const M = BigInt(mVal);

    const n = p * q;
    const phi = (p - 1n) * (q - 1n);

    if (gcd(e, phi) !== 1n) return;

    const d = modInverse(e, phi);

    document.getElementById('nValue').textContent = n;
    document.getElementById('phiValue').textContent = phi;
    document.getElementById('publicKey').textContent = `(${e}, ${n})`;
    document.getElementById('privateKey').textContent = `(${d}, ${n})`;

    // Encryption
    if (M >= n) return;
    const C = modularPow(M, e, n);
    document.getElementById('encryptedResult').textContent = C;

    // Decryption
    const decryptedM = modularPow(C, d, n);
    document.getElementById('decryptedResult').textContent = decryptedM;
}

// Automatically update when inputs change
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", calculateKeys);
});