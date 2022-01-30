const Scaff = require("./methods");

exports.scaff = async (dirName, args) => {
	try {
		new Scaff(dirName, args);
	} catch (error) {
		throw error;
	}
};
