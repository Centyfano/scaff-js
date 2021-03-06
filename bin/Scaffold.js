const fs = require("fs"),
	path = require("path"),
	{ URL } = require("url"),
	{ exec } = require("child_process");
const ora = require("ora");
class Scaffold {
	constructor(dir, arg) {
		this.dirName = dir;
		this.args = arg;
		this.writeFiles();
	}

	/**
	 * @method makeDir()
	 * @description Creates the project directory from the _app-name_
	 */
	makeDir() {
		try {
			const dirName = this.dirName;
			if (!fs.existsSync(dirName)) fs.mkdirSync(dirName);
			return dirName;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * @method createServerName()
	 * @description Appends `.js` to server name file
	 * @default index.js
	 * @returns _serverName_.js
	 */
	createServerName() {
		try {
			this.args.server.endsWith(".js")
				? null
				: (this.args.server = this.args.server.concat(".js"));
			return this.args.server;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * @method appendMeta()
	 * @meta Author, Description
	 */
	appendMeta() {
		try {
			this.args.description ? "" : (this.args.description = "");
			this.args.author ? "" : (this.args.author = "");
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Check if a git repository URL exists among the options passed, if it is there,
	 * the URL is appended to the object that will be in the package.json file
	 * @param {String} repoUrl Git repository URL
	 * @returns String
	 */
	checkRepo(repoUrl) {
		if (repoUrl) {
			const repository = {};
			const bugs = {};
			let homepage = "";

			const url = new URL(repoUrl);
			if (url.hostname.startsWith("git")) {
				let urlStr = url.toString();
				if (urlStr.endsWith("/")) urlStr = urlStr.slice(0, -1);
				repository.type = "git";
				repository.url = `git+${urlStr}.git`;

				//bugs
				bugs.url = `${urlStr}/issues`;
				homepage = urlStr + "#readme";

				return { repository, bugs, homepage };
			}
		} else return { repository: "" };
	}

	/**
	 * @method createJson()
	 * @description appends all the args and creates a json for package.json
	 * @returns json string of the package.json file
	 */
	createJson() {
		try {
			const repo = this.checkRepo(this.args.github);

			const jsPackage = {
				name: this.dirName,
				version: this.args.version,
				description: this.args.description,
				main: this.args.server,
				scripts: {
					test: 'echo "Error: no test specified" && exit 1',
				},
				repository: repo.repository,
				keywords: [],
				author: this.args.author,
				license: this.args.license,
				bugs: repo.bugs,
				homepage: repo.homepage,
			};

			if (this.args.nodemon)
				jsPackage.scripts.dev = `nodemon ${this.args.server}`;
			if (jsPackage.repository == "") {
				delete jsPackage.repository;
				delete jsPackage.bugs;
				delete jsPackage.homepage;
			}

			const jsonPackage = JSON.stringify(jsPackage, null, 4);
			return jsonPackage;
		} catch (error) {
			throw error;
		}
	}

	spinner = ora(); //${this.returnDir()}

	writes() {
		try {
			const writes = new Promise((res, rej) => {
				res(this.spinner.start(`Installing \`app-${this.dirName}\``));
				rej("could not complete");
			});

			writes
				// Create package.json
				.then(() =>
					fs.writeFileSync(
						`${this.dirName}/package.json`,
						this.createJson(),
					),
				)
				.then(() => {
					const wf = this.args.webFramework,
						nm = this.args.nodemon,
						/** webframework_query */
						wf_q = `npm i ${wf}`,
						/** nodemon_query */
						nm_q = `npm i -D nodemon`;

					let query = nm ? wf_q.concat(";", nm_q) : wf_q;

					// run npm install
					let npm_run = exec(query, { cwd: this.dirName });
					npm_run.stdout.on("data", (data) => {});
					npm_run.stdout.once("end", () => {
						this.spinner.succeed(
							`Installed! cd to app-${this.dirName}/`,
						);
					});

					npm_run.stderr.on("err", (err) => {
						console.error(`stderr: ${err}`);
					});
				})
				.then(() => {
					const serverjs =
						this.args.webFramework === "express"
							? `const express = require('express'), 
    app = express();

app.get("/", (req, res, next) =>{
    res.send('Hello world');
});

const PORT = ${this.args.port}
app.listen(PORT, ()=>console.info(\`app-${this.dirName} listening on port \${PORT}\`));
			`
							: `
	const fastify = require('fastify')({ logger: true })

	// Declare a route
	fastify.get('/', async (request, reply) => {
	return { hello: 'world' }
	})

	// Run the server!
	const start = async () => {
	try {
		await fastify.listen(3000)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	}
	start()
			`;
					fs.writeFileSync(
						`${this.dirName}/${this.args.server}`,
						serverjs,
					);
				});
		} catch (error) {
			throw err;
		}
	}

	writeFiles() {
		this.makeDir();
		this.createServerName();
		this.appendMeta();
		this.createJson();
		this.writes();
		// console.log(this.args);
		// console.log(this);
	}
}
module.exports = Scaffold;
