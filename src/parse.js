const Parse = require('parse/node');

Parse.initialize(process.env.PARSE_APPID, process.env.PARSE_JAVASCRIPT_KEY, process.env.PARSE_MASTER_KEY,);
Parse.serverURL = `http://localhost:${process.env.PARSE_PORT || 1337}/${process.env.PARSE_MOUNT || '/parse'}`

module.exports = Parse;
