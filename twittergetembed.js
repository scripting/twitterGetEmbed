var myVersion = "0.4.0", myProductName = "twitterGetEmbed";

const request = require ("request"); 
const utils = require ("daveutils");
const davehttp = require ("davehttp"); 

var config = {
	port: process.env.PORT || 1403,
	flAllowAccessFromAnywhere: true,
	flLogToConsole: true
	};
console.log ("\n" + myProductName + " v" + myVersion);
davehttp.start (config, function (theRequest) {
	switch (theRequest.lowerpath) {
		case "/getembedcode": 
			//https://dev.twitter.com/docs/api/1/get/statuses/oembed
			
			var url = "https://api.twitter.com/1/statuses/oembed.json?id=" + theRequest.params.id;
			
			function addParam (name) {
				if (theRequest.params [name] !== undefined) {
					url += "&" + name + "=" + theRequest.params [name];
					}
				}
			addParam ("maxwidth");
			addParam ("hide_media");
			addParam ("hide_thread");
			addParam ("omit_script");
			addParam ("align");
			addParam ("related");
			addParam ("lang");
			
			request (url, function (error, response, body) {
				if (!error && (response.statusCode == 200)) {
					theRequest.httpReturn (200, "text/plain", body);
					}
				else {
					theRequest.httpReturn (500, "text/plain", utils.jsonStringify (error));
					}
				});
			return;
		}
	theRequest.httpReturn (404, "text/plain", "Not found.");
	});
