/**
 *
 *      Just a simple string lib of things common checks that
 *      look better inline as a readable function name.
 *
 */

const hasSpace = (s) => s.includes(' ');
const startsNumerical = (d) => !isNaN(d[0]);
const isGreaterThan = (n, d) => d.length > n;
const isLessThan = (n, d) => d.length < n;
const containsANumber = (s) => /.*\d/.test(s);
const hasAtLeastOneCap = (s) => /.*[A-Z]/.test(s);
const hasAtLeastOneLower = (s) => /.*[a-z]/.test(s);
const hasAtLeastOneCharacter = (s) => /.*\W/.test(s);

function randomNumberBetween(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

export function intFromPx(string) {
	return parseInt(string.split('px')[0]);
}

export {
	hasSpace,
	startsNumerical,
	isGreaterThan,
	containsANumber,
	hasAtLeastOneCap,
	hasAtLeastOneLower,
	hasAtLeastOneCharacter,
	isLessThan,
	randomNumberBetween,
};
