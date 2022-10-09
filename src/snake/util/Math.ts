export function fmod(a: number, b: number) {
	return Number((a - (Math.floor(a / b) * b)).toPrecision(2));
};
export function isInt(n: number) {
	return Number(n) === n && n % 1 === 0;
}

export function isFloat(n: number) {
	return Number(n) === n && n % 1 !== 0;
}