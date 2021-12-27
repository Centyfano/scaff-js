#! /usr/bin/env node

const { program } = require("commander"),
	fs = require("fs"),
	{ scaff } = require("./files");

program
	.version("1.0.0", "-v", "Current version of the application")
	.name("sf")
	// .alias("sf")
	.description("Scaffold a Node.js app");
let author;

program
	.command("new app-name")
	.description("Generate new application")
	.option("-v   --version <version>", "App version", "1.0.0")
	.option("-d   --description <description>", "App description")
	.option("-wf  --web-framework <framework>", "Web framework used", "express")
	.option("-s   --server <server-name>", "Server name to be used", "index.js")
	.option("-p   --port <port>", "Port number the app runs on", 3000)
	.option("-nm  --nodemon", "Specify whether or not to use nodemon", false)
	.option(
		"-a   --author <author>",
		"Name of the author of the project",
		author,
	)
	.option("-gh  --github <gh-url>", "Project's github URL")
	.option("-lc  --license <license>", "Licence", "ISC")
	.action((app, args) => {
		scaff(app, args);
	});

program
	.command("config")
	.description("Configures parameters")
	.option("-g, --global, <type>", "global parameters");

program.parse(process.argv);

// sc init -g name="cent"
// sc new app -p 3000
// sc s
