var viewLoader = require('../helpers/viewLoader.js');
sys = require("/sys.js"),
utils = require("/utils.js");

function bind (o, fn) {
  return function () {
    return fn.apply(o, arguments);
  };
};

var tableCache = {};

//out puts multidimensional array containing multiplication tables
function mTable(length){
    var L = length || 10,
    row = [],
    c = ",",
    header = ["x"];
    for (var i = 1, a = []; i <= L; i++) {
        header[i] = i;
        row[i] = [];
        for (var j = 0; j <= L; j++) {
            var o = i * j;
            row[i][j] = (o === 0) ? i : o;
            
        }
        
    }

    row[0] = header;
    
    var out = row;
    return out;
}

function htmlTable(table){
    
    var len = table.length;
    var rows = [];
    for (var i=0; i < len; i++) {
        var rowstr = '<tr>';
        
        var row = table[i];
        
        for(var item=0, l = row.length; item < l;  item++){
            
            rowstr += '<td>' + row[item] + '</td>';
        }
        rowstr += '</td>';
        rows.push(rowstr);
    };
    
    var out = '<table>';
    out += rows.join('');
    return out + '</table>';
    
}

//implement the interface
exports.getModule = function(request, rpc){
    
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
    
    var length = request.uri.params.length || 10;
    
    if(length > 100){
        length = 100;
        
    }
    
    if(tableCache[length]){
        t = tableCache[length];
    }else{
        var t = mTable(length);
        tableCache[length] = t;
    }
    
    
    var data = {
        
        message:'Hello sir',
        
        newsurl:'/news',
        
        messagetype:'page',
        
        table: t,
        
        action:'/multi',
        
        length:length,
        
        //these functions are passed through to the client to handle data 
        //refresh
        htmlTable:htmlTable,
        
        mTable:mTable
        
    };
    
    //basic view handling code,
    //not a lot automated, a controller should decide which view to return
    //if any
    if(rpc){
        setTimeout(function(){
            body = JSON.stringify(data);
            headers['Content-Type'] = 'text/plain';
            p.emitSuccess(ret);
        },0);
    }else{
        data.table = htmlTable(t);
        var f = viewLoader.load('multiply', data);
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


