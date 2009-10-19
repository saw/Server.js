#!/usr/bin/env node

var sys = require("/sys.js"),
   http = require("/http.js"),
   map  = require('map.js');
   
function handleRequest(request, response){
    var path = request.uri.path;
     var r = response;
    if(map.uris[path]){
        try{
            sys.puts('getting mod');
            var mod = require('controllers/' + map.uris[path].module + '.js').getModule(request)
            .addCallback(function(obj){
                r.sendHeader(200, obj.getHeaders());
                r.sendBody(obj.getBody());
                r.finish();
            });
        }catch(e){        
            response.sendHeader(500, {'Content-Type': "text/plain"});
            response.sendBody("A server error occured:"+ e.message);
            response.finish();
        }
        
       
        
        // mod.addCallback(function(obj){
        //     sys.puts('cb...');
        //     r.sendHeader(200, obj.getHeaders());
        //     r.sendBody(obj.getBody());
        //     r.finish();
        // });

        
    }else{
        response.sendHeader(404);
        response.sendBody('Not Found' + ': '+ path);
        response.finish();
    }
    

    
}   
   
http.createServer(handleRequest).listen(8000);



sys.puts("Server running at http://127.0.0.1:8000/");