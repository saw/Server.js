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
    
    var f = node.fs.cat('views/home.nhtml');
    
    f.addCallback(function(c){
        sys.puts('ok');
        body = c;
        
        var arr = body.replace(/(?:\{\{)(.+)(?:\}\})/g, function(match, name){
            if(data[name]){
                return data[name];
            }else{
                return name;
            }
        });

        body = arr;
        p.emitSuccess(ret);
    });
    
    f.addErrback(function(c){
        sys.puts('fail');
        body = JSON.stringify(c);
        p.emitSuccess(ret); 
    });
    return p;
    
}