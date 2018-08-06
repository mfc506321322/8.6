function ajax(url,ck){
    var xml = new XMLHttpRequest;
    xml.onload = function(res){
        if(res.target.status == 200 ||res.target.status == 304){
            ck && ck(res.target.response);
        }
    }
    xml.open("get",url,true);
    xml.send();
}