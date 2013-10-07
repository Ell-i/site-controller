
function route(handle, method, pathname, query, response, postData) {
    console.log("About to route a request for " + pathname); 
    if (typeof handle[pathname] === 'function') {
        handle[pathname](method, query, response, postData);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();    
    }
}

exports.route=route;
