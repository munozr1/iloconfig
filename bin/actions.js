const https = require("https");
const axios = require("axios").default;
const fs = require("fs");
const color = require("colors");
const utils = require("./utils");
const agent = new https.Agent({
	rejectUnauthorized: false,
});
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

async function testConnection(ip) {
	return await axios
		.get(`https://${ip}/redfish/v1/`, {
			headers: {
				"Content-Type": "application/json",
				httpsAgent: agent,
			},
		})
		.then((resp) => {
			console.log("RESP", resp.data);
		})
		.catch((err) => {
			// console.log("ERROR HAPPENED", err);
			console.log("ERROR".bgRed.white, `${err.toString()}`.red);
		});
}

/**
 * 
 * @param {*} ip 
 * @param {*} u 
 * @param {*} p 
 * @param {*} next (returns a token to be used in other session based requests)
 * @link https: //hewlettpackard.github.io/iLOAmpPack-Redfish-API-Docs/#authentication-and-sessions
 * @returns 
 */
async function createSession(ip, u, p, next) {
	const axios = require('axios');
	const data = JSON.stringify({
		"UserName": u,
		"Password": p
	});

	const config = {
		method: 'post',
		url: `https://${ip}/redfish/v1/SessionService/Sessions/`,
		headers: {
			'Content-Type': 'application/json',
			httpsAgent: agent,
		},
		data: data
	};

	return axios(config)
		.then(response => {
			console.log('')
			next({
				token: response.headers['x-auth-token'],
				baseUrl: `https://${ip}/redfish/v1`,
				basic: utils.authHeader(u, p)
			})
		})
		.catch(error => console.log("ERROR".bgRed.white, `${error.toString()}`.red));

}


async function createUser(auth, createUserPayload) {
	const data = JSON.stringify(createUserPayload);

	const config = {
		method: 'post',
		url: `${auth.baseUrl}/AccountService/Accounts`,
		headers: {
			'Content-Type': 'application/json',
			// 'Authorization': auth.basic
			"x-auth-token": auth.token,
		},
		data: data
	};

	axios(config)
		.then(function (response) {
			console.log(`Create User Respnse => `.green.bold)
			console.log(response.data);
		})
		.catch(error => console.log("ERROR".bgRed.white, `${pretty(error.response.data)}`.red.bold));

}

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
	console.log("logon creds", { ip, username, password });
	return await axios
		.post(
			`https://${ip}/redfish/v1/SessionsService/Sessions/`,
			// `https://${ip}/redfish/v1/Sessions/`,
			{
				Password: username,
				UserName: password,
			},
			{
				headers: {
					"Content-Type": "application/json",
					httpsAgent: agent,
				},
			}
		)
		.then((resp) => {
			console.log("RESP", resp);
		})
		.catch((err) => {
			console.log(JSON.stringify(err.response.data));
			console.log("ERROR".bgRed.white, `${err.toString()}`.red);
		});
}

/**
 *
 * @param {string1} ip
 * @param {string} username
 * @param {string} password
 * @param {string} role
 * @param {string} jwt
 * @returns returns whether the user was created or not
 */
async function createUser_old(ip, username, password, role, jwt) {
	return await axios
		.post(
			`${ip}/redfish/v1/Accounts/`,
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

/**
 *
 * @param {string} ip
 * @param {string} license
 * @param {string} jwt
 * @returns returns wheter the license was added or not
 */
async function setLicense(ip, license, jwt) {
	return await axios
		.post(
			`${ip}/redfish/v1/Managers/1/LicenseService/`,
			{
				LicenseKey: license,
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

//"Oem/Hp/DHCPv4/Enabled" : EthernetInterfaces
async function changeDHCP(ip, status, jwt) {
	return await axios
		.patch(
			`${ip}/redfish/v1/managers/1/ethernetinterfaces/1/`,
			{
				Oem: {
					Hp: {
						DHCPv4: {
							Enabled: status,
						},
					},
				},
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

///rest/v1/Managers/{item}/EthernetInterfaces/{item}
async function changeHostname(ip, hostname, jwt) {
	return await axios
		.post(
			`${ip}/redfish/v1/Managers/1/EthernetInterfaces/1/`,
			{
				Oem: {
					Hp: {
						HostName: hostname,
					},
				},
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
async function changeIp(ip, username, password, role, jwt) {
	return await axios
		.post(
			`${ip}/redfish/v1/Accounts/`,
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
/**
 *
 * @param {string} filename The name or path of the file to parse
 
 * @returns {Array} An array of objects representing the data in the file
 * @example 
 * input:   
 * 192.168.3.214,administrator,8DF985G,newuser,newpassword
 * 192.168.3.514,administrator,8DF985G,newuser,newpassword

 * output: 
DATA [
  {
    ip: '192.168.3.214',
    default_username: 'administrator',
    default_password: '8DF985G',
    new_username: 'newuser',
    new_password: 'newpassword'
  },
  {
    ip: '192.168.3.514',
    default_username: 'administrator',
    default_password: '8DF985G',
    new_username: 'newuser',
    new_password: 'newpassword'
  },

  ]
 */
function parseCSV(filename) {
	fs.readFile(filename, "utf8", function (err, data) {
		if (err) {
			return console.log(err);
		}
		var lines = data.split("\n");
		var headers = lines[0].split(",");
		var result = [];
		for (var i = 0; i < lines.length; i++) {
			var obj = {};
			var currentline = lines[i].split(",");
			if (h) {
				for (var j = 0; j < headers.length; j++) {
					obj[headers[j]] = currentline[j];
				}
			} else {
				obj = currentline;
			}
			result.push(obj);
		}
		result.shift();
		console.log("DATA", result);

		return result;
	});
}
module.exports = {
	login,
	testConnection,
	createSession,
	createUser
};


function pretty(obj) {
	return JSON.stringify(obj, null, 2)
}