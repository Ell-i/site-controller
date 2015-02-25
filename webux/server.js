/**
 * HTTP server
 */

var http=require("http");
var url=require("url");
//TODO: Enable when dali-lib is public
//var require("dali-lib");
var config=require("./config_static");
var time=require("./time");

function start(route, handle){
    function onRequest(request, response) {
        var postData = "";
        var requrl   = url.parse(request.url);
        var pathname = requrl.pathname;
        var query    = requrl.search;
        var method   = request.method.toLowerCase()
        console.log("Request for " + pathname + " received.");
        if (!query)
            query = "";

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) { 
            postData += postDataChunk;
            console.log("Received POST data chunk '"+ postDataChunk + "'.");
        });
        
        request.addListener("end", function() { 
            route(handle, method, pathname, query, response, postData);
        }); 
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");

    //TODO: Enable when dali-lib is public
    //dali.init("10.254.1.1", function(){});
    config.init();
    time.init();
}

exports.start = start;




