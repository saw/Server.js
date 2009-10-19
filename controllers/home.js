var viewLoader = require('../helpers/viewLoader.js');
sys = require("/sys.js"),
utils = require("/utils.js");

function bind (o, fn) {
  return function () {
    return fn.apply(o, arguments);
  };
};


exports.getModule = function(request, rpc){
    
    var p = new node.Promise();
    
    var body = 'foo';
    var headers = {};
    
    sys.puts('ok');
    
    var ret = {
        
        getHeaders:function(){
            return {'Content-Type':'text/html'};
        },
        
        getBody:function(){
            return body;
        }
        
    };
    
    var data = {
        
        message:'Hello sir',
        
        newsurl:'/news',
        
        messagetype:'page'
        
    };
    
    if(rpc){
        setTimeout(function(){
            body = JSON.stringify(data);
            headers['Content-Type'] = 'text/plain';
            p.emitSuccess(ret);
        },0);
    }else{
        var f = viewLoader.load('home', data);
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