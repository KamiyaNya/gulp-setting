const { src } = require("gulp");
const ftp = require("vinyl-ftp");
const ftpSettings = require("../ftp_settings");
const chalk = require("chalk");
const connect = ftp.create(ftpSettings);

module.exports = function deploy() {
	return src(["build/**/*.*", "!build/**/*.map"])
		.pipe(connect.newer("template/"))
		.pipe(connect.dest("template/"))
		.on("success", () => console.log(`Finished deploing ./build to https://${chalk.blueBright(ftpSettings.host)}`));
};
