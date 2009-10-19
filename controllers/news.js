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
        
        message:'This page is all news',
        messagetype:'note'
        
    };
    

    return p;
    
}