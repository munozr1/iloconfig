const axios = require("axios").default;
const https = require("https");

class SInstance {
	constructor(
		adminUsername,
		adminPassword,
		hostname,
		newUsername,
		newPassword,
		headers,
		ip,
		url_prefix,
		actions
	) {
		this.adminUsername = adminUsername;
		this.adminPassword = adminPassword;
		this.hostname = hostname;
		this.url_prefix = url_prefix;
		this.newUsername = newUsername;
		this.newPassword = newPassword;
		this.ip = ip;
		this.headers = headers;
		this.actions = actions;
	}

	config = {
		httpsAgent: this.agent,
		"Content-Type": "application/json",
		UserName: this.adminUsername,
		Password: this.adminPassword,
	};
	async authenticate() {
		return await axios.get(
			`https://${this.ip}${this.url_prefix}SessionService/Sessions/`
		);
	}
}

module.exports = SInstance;
