const fs = require("fs"),
	path = require("path"),
	Scaff = require("./methods"),
	{ exec } = require("child_process");

exports.scaff = async (dirName, args) => {
	// 	try {
	// 		spinner.start();
	// 		// create directory
	// 		if (!fs.existsSync(dirName)) fs.mkdirSync(dirName);

	// 		// append .js to server name
	// 		args.server.endsWith(".js")
	// 			? ""
	// 			: (args.server = args.server.concat(".js"));

	// 		// author
	// 		args.description ? "" : (args.description = "");
	// 		args.author ? "" : (args.author = "");

	// 		checkRepo = (url) => {
	// 			if (!url) return "";
	// 			else {
	// 				return {
	// 					type: "git",
	// 					url: url,
	// 				};
	// 			}
	// 		};

	// 		const jsonFile = {
	// 			name: dirName,
	// 			version: args.version,
	// 			description: args.description,
	// 			main: args.server,
	// 			scripts: {
	// 				test: 'echo "Error: no test specified" && exit 1',
	// 			},
	// 			repository: checkRepo(args.github),
	// 			keywords: [],
	// 			author: args.author,
	// 			license: args.license,
	// 		};

	// 		if (args.nodemon) jsonFile.scripts.dev = `nodemon ${args.server}`;
	// 		if (jsonFile.repository == "") delete jsonFile.repository;

	// 		const j = JSON.stringify(jsonFile, null, 4);
	// 		const fun = new Promise((res, rej) => {
	// 			res(spinner.stop());
	// 			rej("could not complete");
	// 		});

	// 		fun.then(() => {
	// 			fs.writeFileSync(`${dirName}/package.json`, j);
	// 			// console.log(args);
	// 		})
	// 			.then(() => {
	// 				const wf = args.webFramework;
	// 				let npmi = exec(`npm i ${wf};npm i -D nodemon`, {
	// 					cwd: dirName,
	// 				});

	// 				// npmi.stdout.on("data", (data) => console.info(data));
	// 				npmi.stderr.on("data", (err) => {
	// 					console.error(`stderr: ${err}`);
	// 				});
	// 			})
	// 			.then((end) => {
	// 				const frameExp = `const express = require('express'), app = express();

	// app.get("/", (req, res, next) =>{
	// 	res.send('Hello world');
	// });

	// const PORT = ${args.port}
	// app.listen(PORT, ()=>console.info(\`app-${dirName} listening on port \${PORT}\`));
	// 		`;
	// 				const frameFast = `
	// const fastify = require('fastify')({ logger: true })

	// // Declare a route
	// fastify.get('/', async (request, reply) => {
	// return { hello: 'world' }
	// })

	// // Run the server!
	// const start = async () => {
	// try {
	// 	await fastify.listen(3000)
	// } catch (err) {
	// 	fastify.log.error(err)
	// 	process.exit(1)
	// }
	// }
	// start()
	// 		`;

	// 				if (args.webFramework == "express")
	// 					fs.writeFileSync(`${dirName}/${args.server}`, frameExp);
	// 				else if (args.webFramework == "fastify")
	// 					fs.writeFileSync(`${dirName}/${args.server}`, frameFast);
	// 			});
	// 	}
	// catch (error) { }
	// console.log(args);
	new Scaff(dirName, args);
	// sc.makeDir()
	// sc.createServerName();
	// sc.appendMeta()
	// sc.test()
};
