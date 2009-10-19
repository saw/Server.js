#!/usr/bin/env node

var sys = require("/sys.js"),
   http = require("/http.js"),
   map  = require('map.js');
   
function handleRequest(request, response){
    var path = request.uri.path;
     var r = response;
     
    sys.puts('request recieved. Data:');
    var reqString = JSON.stringify(request)
    sys.puts(reqString);
    if(map.uris[path]){
        try{
            sys.puts('getting mod');
            
            var rpc = request.uri.params.rpc;
            
            var mod = require('controllers/' + map.uris[path].module + '.js').getModule(request, rpc)
            .addCallback(function(obj){
                r.sendHeader(200, obj.getHeaders());
                r.sendBody(obj.getBody());
                r.finish();
            });
        }catch(e){
            
            
            response.sendHeader(500, {'Content-Type': "text/html"});
            var err = JSON.stringify(e);
            response.sendBody("<pre>A server error occured:"+ err+"</pre");
            response.finish();
            sys.puts('500 error:');
            sys.puts(err);
        }

        
    }else{
        response.sendHeader(404);
        response.sendBody('Not Found' + ': '+ path);
        response.finish();
        sys.puts('////404 not found. ');
    }
    

    
}   
   
http.createServer(handleRequest).listen(8000);



sys.puts("Server running at http://127.0.0.1:8000/");