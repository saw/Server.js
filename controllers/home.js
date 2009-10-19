var viewLoader = require('../helpers/viewLoader.js');
sys = require("/sys.js"),
utils = require("/utils.js");

function bind (o, fn) {
  return function () {
    return fn.apply(o, arguments);
  };
};


exports.getModule = function(request){
    
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
        
        message:'Hello sir'
        
    };
    
    var f = viewLoader.load('home');
    f.addCallback(function(c){
        body = c;
        p.emitSuccess(ret);
    });
    f.addErrback(function(c){
        body = JSON.stringify(c);
        p.emitSuccess(ret);
    })
    
    
    return p;
    
}