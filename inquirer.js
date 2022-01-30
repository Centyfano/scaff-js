/**
 * Input prompt example
 */

"use strict";
const inquirer = require("inquirer");

const questions = [
	{
		type: "input",
		name: "first_name",
		message: "What's your first name",
	},
	{
		type: "input",
		name: "last_name",
		message: "What's your last name",
		default() {
			return "Doe";
		},
	},
];

inquirer.prompt(questions).then((answers) => {
	console.log(JSON.stringify(answers, null, "  "));
});
