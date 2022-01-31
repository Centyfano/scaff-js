#! /usr/bin/env node

const { program } = require("commander"),
	fs = require("fs"),
	{ scaffold, writeConfig, readConfig } = require("./objectMethods");

program
	.version("1.0.0", "-v", "Current version of the application")
	.name("sf")
	// .alias("sf")
	.description("Scaffold a Node.js app");

const params = readConfig(),
	{ username, webFramework, server, port, nodemon } = params;

program
	.command("new app-name")
	.description("Generate new application")
	.option("-v   --version <version>", "App version", "1.0.0")
	.option("-d   --description <description>", "App description")
	.option(
		"-wf  --web-framework <framework>",
		"Web framework used",
		webFramework,
	) //express
	.option("-s   --server <server-name>", "Server name to be used", server) //
	.option("-p   --port <port>", "Port number the app runs on", port) //3000
	.option("-nm  --nodemon", "Specify whether or not to use nodemon", nodemon) //false
	.option(
		"-u   --username <username>",
		"Name of the author of the project",
		username,
	)
	.option("-gh  --github <gh-url>", "Project's github URL")
	.option("-lc  --license <license>", "Licence", "ISC")
	.action((app, args) => {
		scaffold(app, args);
	});

program
	.command("config")
	.description("Configures (sets) default parameters globally")
	.option("-u   --username <username>", "Project author")
	.option(
		"-wf  --web-framework <framework>",
		"Web framework, express or fastify",
	)
	.option(
		"-s   --server <server-name>",
		"Server name to be used e.g. index.js",
	)
	.option("-p   --port <port>", "Port number the apps to run on")
	.option("-nm  --nodemon <trueOrFalse>", "Use nodemon")
	.action((app) => {
		writeConfig(app);
	});

program.parse(process.argv);

// sc init -g name="cent"
// sc new app -p 3000
// sc s
