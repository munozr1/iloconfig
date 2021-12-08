const axios = require("axios").default;
//object containing the ip and passwords as a key:value pair
let iLO_hosts = {};
let iLO_host = "https://192.168.3.214/redfish/v1/SessionService/Sessions/";
// defualt username for the hosts
let login_username = "administrator";
//defualt password for the hosts
let login_password = "";
// array of all the hostnames we need to configure
let HOSTNAMES = [];
// new admin username
let new_username = "";
// new admin password
let new_password = "";
// authentication information such as headers and server information
let auth = {};
// payload containing the configuration we want to push to the server
let payload = {};
let header = {
	"Content-Type": "application/json",
};

/**
 *
 * @param {string} url ip address of the server we want to log into
 * @param {string} username username to log into the server
 * @param {string} password password to log into the server
 * @returns returns server data in json format. LOG IN SUCCESS || LOG IN FAILED: reason for fail
 */
async function login(url, username, password) {
	return await axios
		.get(url, {
			"Content-Type": "application/json",
			UserName: username,
			Password: password,
		})
		.then((resp) => {
			console.log("LOG IN CALLED", resp);
			auth = resp;
		});
}

async function createNewAdmin() {
	payload = {
		RoleId: "Administrator",
		Oem: {
			Hpe: {
				Privileges: {
					SystemRecoveryConfigPriv: true,
				},
			},
		},
	};
}
async function logout() {}

async function updateHostname() {}
async function updateGatewayIpSubnet() {}
async function installLicense(license) {}

/**
 * @description defualt configuration for TV2 servers.
 */
// async function TV2() {
// 	iLO_hosts.forEach((ip) => {
// 		await login(
// 			"https://" + ip + "/redfish/v1/",
// 			login_username,
// 			login_password
// 		);
// 		await createNewAdmin();
// 		await logout();
// 		await login("https://" + ip + "/redfish/v1/", new_username, new_password);
// 		await updateHostname();
// 		await updateGatewayIpSubnet();
// 		await installLicense(license);
// 	});
// }
