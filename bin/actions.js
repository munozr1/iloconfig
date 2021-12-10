const https = require("https");
const axios = require("axios").default;
const agent = new https.Agent({
	rejectUnauthorized: false,
});

/**
 *
 * @param {string} ip -> ip address of the server
 * @param {string} username -> default username of the server
 * @param {string} password -> default password of the server
 * @returns An object with the followoing important information:
 *          - x-auth-token : the token to be used in the next requests
 *          - location : the location url to logout
 */
async function login(ip, username, password) {
	return await axios.post(
		`${ip}/redfish/v1/SessionsService/Sessions/`,
		{
			UserName: username,
			Password: password,
		},
		{
			headers: {
				"Content-Type": "application/json",
				httpsAgent: agent,
			},
		}
	);
}

async function createUser(username, password, role, jwt) {
	return await axios
		.post(
			SInstance.ip + SInstance.url_prefix,
			{
				UserName: username,
				Password: password,
				RoleId: role,
			},
			{
				headers: headers,
				"x-auth-token": jwt,
			}
		)
		.then((resp) => {
			console.log("RESP", resp);
		})
		.catch((err) => {
			console.log("ERR check if certificate is valid (most common)", err);
		});
}
