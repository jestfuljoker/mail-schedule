export default {
	moduleFileExtensions: ["js", "json", "ts"],
	moduleNameMapper: {
		"^~/(.*)$": "<rootDir>/src/$1",
	},
	testRegex: ".*\\..*spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": ["@swc/jest"],
	},
	collectCoverageFrom: ["**/*.(t|j)s"],
	coverageDirectory: "<rootDir>/coverage",
	testEnvironment: "node",
};
