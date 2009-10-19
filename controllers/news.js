var viewLoader = require('../helpers/viewLoader.js');
sys = require("/sys.js"),
utils = require("/utils.js");


exports.getModule = function(request, rpc){
    
    var p = new node.Promise();
    var params = request.uri.params;
    
    
    var body = 'foo';
    var headers = {'Content-Type':'text/html'};
    
    sys.puts('ok');
    
    var ret = {
        
        getHeaders:function(){
            return headers;
        },
        
        getBody:function(){
            return body;
        }
        
    };
    
    var data = {
        
        message:'This page is all news',
        messagetype:'note'
        
    };
    
    if(rpc){
        setTimeout(function(){
            body = JSON.stringify(data);
            headers['Content-Type'] = 'text/plain';
            p.emitSuccess(ret);
        },0);
    }else{
        var f = viewLoader.load('news', data);
        f.addCallback(function(c){
            body = c;
            p.emitSuccess(ret);
        });
        f.addErrback(function(c){
            body = JSON.stringify(c);
            p.emitSuccess(ret);
        })
    }
    

    
    return p;
    
}