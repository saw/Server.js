exports.getModule = function(request){
    
    return {
        
        getHeaders:function(){
            return {'Content-Type':'text/html'};
        },
        
        getBody:function(){

            return 'news page   ';
        }
        
    }
    
}