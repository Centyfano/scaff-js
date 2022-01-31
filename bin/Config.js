const fs = require("fs"),
	path = require("path");

class Config {
	constructor() {}
	jsonPath = path.join(__dirname, "config", "config.json");
	jsonExists = fs.existsSync(this.jsonPath);

	readFile() {
		const params = {
			username: undefined,
			webFramework: "express",
			server: "index.js",
			port: 3000,
			nodemon: false,
		};

		if (!this.jsonExists) {
			return params;
		}
		const jsonFile = JSON.parse(fs.readFileSync(this.jsonPath));
		const modifiedJson = Object.assign(params, jsonFile);

		/** Parse port as string */
		modifiedJson["port"]
			? (modifiedJson.port = parseInt(modifiedJson.port))
			: "";

		/** Concatenate `.js` to server name */
		if (modifiedJson["server"]) {
			if (!modifiedJson.server.endsWith(".js"))
				modifiedJson.server = modifiedJson.server.concat(".js");
		}
		return modifiedJson;
	}

	writeFile(params) {
		/** Create file, write contents passed in params */
		if (!this.jsonExists) {
			!fs.existsSync(this.jsonPath)
				? fs.mkdirSync(path.join(__dirname, "config"))
				: "";
			const jsonConfig = JSON.stringify(params);
			fs.writeFileSync(this.jsonPath, jsonConfig);
		} else {
			/** Read file, modify contents with params, overwrite file */
			const jsonFile = JSON.parse(fs.readFileSync(this.jsonPath));
			const modifiedJson = Object.assign(jsonFile, params);
			fs.writeFileSync(this.jsonPath, JSON.stringify(modifiedJson));
		}
	}
}
module.exports = Config;
