const rest = require("ilorest");
const iLO = rest.redfishClient("");
const axios = require('axios');

//object containing the ip and passwords as a key:value pair
let iLO_hosts = {};
let iLO_host;
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
let auth  ={}
// payload containing the configuration we want to push to the server
let payload ={}

/**
 * 
 * @param {*} url ip address of the server we want to log into  
 * @param {*} username username to log into the server
 * @param {*} password password to log into the server
 * @returns returns server data in json format. LOG IN SUCCESS || LOG IN FAILED: reason for fail
 */
async function login(url, username, password){
	return await axios.get(url, {username: username, password: password})
	.then(console.log('LOGGED IN'));
}

async function createNewAdmin(){
	payload = { 
		    "RoleId": "Administrator",
    "Oem": {
        "Hpe": {
            "Privileges": {
                "SystemRecoveryConfigPriv": true
            }
        }
    }
	}
}
async function logout(){

}

async function updateHostname(){

}
async function updateGatewayIpSubnet(){

}
async function installLicense(license){

}

/**
 * @description defualt configuration for TV2 servers. 
 */
async function TV2(){
	iLO_hosts.forEach(ip =>{
		
		auth = await login("https://"+ip+"/redfish/v1/",login_username, login_password);
		await createNewAdmin();
		await logout();
		await login("https://"+ip+"/redfish/v1/", new_username, new_password);
		await updateHostname();
		await updateGatewayIpSubnet();
		await installLicense(license);
	})
}