module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		jquery: true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"no-unused-vars": ["warn"],
		"no-empty": ["warn"],
	},
};
