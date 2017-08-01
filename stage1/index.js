var http = require('http');
const PORT = 3000;

function handleRequest(request, response){
  response.end('Node server working' + request.url);
}

var server = http.createServer(handleRequest);
server.listen(PORT, function(){
  console.log('Server listening on port: ' + PORT);
});
