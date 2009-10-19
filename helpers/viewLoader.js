var sys = require("/sys.js");
var utils  = require('/utils.js');




function loadView(viewName, data){
       
       var p = new node.Promise(), d = data;
       
       var out = JSON.stringify(node);
       
       node.fs.cat('../views/home.nhtml').addCallback(function (content) {
           sys.puts('here');
             var tString = content;
             p.emitSuccess(tString);
       });
       
       return p;
}


exports.load = loadView;
