var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
          });
          });






/*var app = require('http').createServer(handler),    
    io = require('socket.io').listen(80),
    fs = require('fs')

app.listen(80);

function handler (req, res){
    fs.readFile(__dirname + '/index.html', function(err, data){
        if(err){
            res.writeHead(500);
            return res.end("Error loading html file");
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on('connection', function(socket) {
    socket.emit('news', {hello : 'world'});
    socket.on('my other event', function(data){
        console.log(data);
    });
});
*/
