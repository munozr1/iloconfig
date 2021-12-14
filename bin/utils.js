module.exports = {
	parseSentence: parseSentence,
	authHeader
};
function parseSentence(words) {
	var sentence = "";
	for (var i = 1; i < words.length; i++) {
		sentence = sentence + words[i] + " ";
	}
}

function authHeader(u, p) {
	return "Basic " + new Buffer(u + ":" + p).toString("base64");
}