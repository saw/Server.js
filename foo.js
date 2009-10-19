#!/usr/bin/env node

node.mixin(require("/utils.js"));
var sys = require('/sys.js'),
   http = require("/http.js");
   
   http.createServer(function (request, response) {
       response.sendHeader(200, {"Content-Type": "text/html"});

       
       var path = request.uri.path;
       response.sendBody(path);
       
       response.finish();
   }).listen(8000);
