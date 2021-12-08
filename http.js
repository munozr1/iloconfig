const rest = require("ilorest");
const iLO = rest.redfishClient("");
const axios = require('axios');


let iLO_host = "";
let login_username = "";
let login_password = "";

async function login(url, username, password){
	return await axios.get(url, {username: username, password: password})
	.then(console.log('LOGGED IN'));
}