const Config = require("./Config");
const Scaffold = require("./Scaffold");

exports.scaffold = async (dirName, args) => {
	try {
		new Scaffold(dirName, args);
	} catch (error) {
		throw error;
	}
};

exports.writeConfig = async (config) => {
	try {
		new Config().writeFile(config);
	} catch (error) {
		throw error;
	}
};

exports.readConfig = () => {
	try {
		const nw = new Config().readFile();
		return nw;
	} catch (error) {
		throw error;
	}
};
