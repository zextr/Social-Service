"use strict";

/* Third Party Modules */
var request = require("request");
var debug = require("debug")("Facebook Service");

/* Internal config files*/
var config = require("../config").facebook;

function createRequestOpts(options, cb)

var facebookService = {
	validatePost : function(options, cb){
		var opts = {};
		var error;
		var validFlag = false;

		//Todo add other post items as well.
		["message","link"].forEach(function(key){
			if(options[key]){
				opts[key] = options[key];
			}
		});

		if(Object.keys(opts) && Object.keys(opts).length) validFlag = true;

		if(!validFlag){
			error = new Error("Insufficient parameters");
			error.status = 403;
			return cb(error);
		}
	},

	publishPost : function(options, cb){
		
		var opts = {};
		var reqOpts = {};
		var error;
		var validFlag = false;
		var url = "https://graph.facebook.com/me/feed?";	

		//Todo add other post items as well.
		["message","link"].forEach(function(key){
			if(options[key]){
				opts[key] = options[key];
			}
		});

		if(Object.keys(opts) && Object.keys(opts).length) validFlag = true;

		if(!validFlag){
			error = new Error("Insufficient parameters");
			error.status = 403;
			return cb(error);
		}

		url += "access_token=" + config.pages.oyewiki.access_token;

		Object.keys(opts).forEach(function(key){
			url += "&" + key + "=" + opts[key];
		});

		reqOpts = {
			url : url
		};

		require.post(reqOpts, function(err, resp, body){
			if(err, resp.statusCode !== 200){
				error = err || new Error("Not able to publis post");
				return cb(error);	
			}
			
			cb(null, body);
		});

	}
};

module.exports = facebookService;
