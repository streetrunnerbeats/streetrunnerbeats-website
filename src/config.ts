// ==> Server & API
export const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}`;
export const DEFAULT_HEADERS = {
	'Content-Type': 'application/json',
};

// ==> Token Details
const minutesForToken = 60;
const tokenDuration = 1000 * 60 * minutesForToken; // 1s ••to•• 1min ••to•• TotalTime
export const TOKEN_DURATION = { ms: tokenDuration, s: tokenDuration / 1000 };
export const TOKEN_LABEL = `srbeats-token__`;
