var sys = require("/sys.js");
var utils  = require('/utils.js');




function loadView(viewName, data){
       
       
    var p = new node.Promise();
    var f = node.fs.cat('views/news.nhtml');
    
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


        p.emitSuccess(arr);
    });
    
    f.addErrback(function(c){
        sys.puts('failed to load template');

        p.emitError(c);
    });
    
    return p;
}


exports.load = loadView;
