const rest = require("ilorest");
const iLO = rest.redfishClient("");

let iLO_host = "";
let login_username = "";
let login_password = "";

function login(login_username, login_password) {
	iLO.login();
}
