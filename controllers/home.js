var viewLoader = require('../helpers/viewLoader.js');

function bind (o, fn) {
  return function () {
    return fn.apply(o, arguments);
  };
};


exports.getModule = function(request){
    
    var p = new node.Promise();
    
    var body = 'foo';
    var headers = {};
    
    
    var ret = {
        
        getHeaders:function(){
            return {'Content-Type':'text/html'};
        },
        
        getBody:function(){
            return body;
        }
        
    };
    
    viewLoader.load('home', {foo:'bar'}).addCallback(function(f){
       p.emitSuccess(ret); 
    });
    
    return p;
    
}