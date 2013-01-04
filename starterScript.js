/*  This is a simple node script that starts a whole bunch of other programs
 *  It does this by reading a small file, shoves the 
 *  
 *  Current capabilities:
 *  - Turn on arbitrary number of scripts
 *  - Broadcast via scocket it's name, PID, and stdOut + stdErr
 *  - Upon error, the name is marked with an error property
 *  
 *  Todo:
 *  - Set up an interface
 *  - Allow for interface to restart programs that suffered from a failure
 *  - MAKE A FUCKING INTERFACE!!!!!
 *
 *  - Version 0.0.4
 *
 */


var fs = require('fs'),
    spawn = require('child_process').spawn,
    runningScripts= [],
    clients = 0,
    Statuses = {};

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(80)
// serve the files using express framework
app.use(express.static(__dirname + '/public'));

// This is supposed to be a blocking operation. Don't start anything till this finishes!
var scriptToBeRun = fs.readFileSync('scripts.txt').toString().split("\n");
scriptToBeRun.pop() // Get rid of the blank spot at the end

var numScripts = scriptToBeRun.length;
var index = 0

console.log(numScripts);
console.log(scriptToBeRun)


for(var i = 0; i < numScripts ; i++){

    runningScripts[i] = spawn('python', ['-u',scriptToBeRun[i] ]); //Creates the scripts

    Statuses[scriptToBeRun[i]] =  {"Name" : scriptToBeRun[i], "PID" : runningScripts[i].pid};

}

for(var i = 0; i < runningScripts.length ; i++){
        runningScripts[i].stdout.on("data", stdOutCallback(i, Statuses, scriptToBeRun))  // Event handlers for each stream
        runningScripts[i].stderr.on("data", stdErrCallback(i, Statuses, scriptToBeRun))
    };


setInterval(function(){
    console.log(Statuses); 
    console.log("-----------------------------------");
    }, 1000);
//////////////////////////////////// SOCKETS /////////////////////////////////////
// I think that keeping the broadcasting on the server side might be better
// It keeps the strain off the server by just sending out a single broadcast
// as opposed to having to deal with X requests, which could grow after a while
// I know this won't grow, but it's still good practice!!!

io.sockets.on("connection", function(socket){
    clients++;
    console.log("Connection was made with a client");
    setInterval(function(){
        socket.broadcast.volatile.emit('recall', Statuses)
    },1000)
    })
    


//////////////////////////////////// FUNCTIONS ///////////////////////////////////
 // All this is doing is populating the JSON that I am going to sending out. 
// We're simply making a data packet. It might be a good idea to make this whle
// thing into some module. That way what I'll get is a nice piece that I can
// publish (I doubt people will really need something of this class
//
// Sending this to an interface might be soemething else. This makes
// good for RO for example. And other things where you want to 
// monitor several daemons. OH THAT'S THIS IS, A COMMUNICATOR 
// WITH DAEMONS!!!! HOLY SHIT!!!


function stdOutCallback(index, json_Stats, scriptsList){
    return function(data){
        Statuses[scriptsList[index]]["Data"] = data.toString().replace('\n','').trim();
        Statuses[scriptsList[index]]["Status"] = "Operational" 

    // Test to see how it actually works / what am I seeing
       // console.log("Index: " + index);
       // console.log("Statuses: " + json_Stats);
       // console.log("Data: " + data);
       // console.log("Scripts: " + scriptsList[index]);
        };
    }

function stdErrCallback(index, json_Stats, scriptsList){
    return function(error){ 
        Statuses[scriptsList[index]]["Data"] = undefined;
        Statuses[scriptsList[index]]["Error"] = error.toString().trim();
        Statuses[scriptsList[index]]["PID"] = undefined;
        Statuses[scriptsList[index]]["Status"] = "Error Occured";
        };
    }
    




/*   I know this works, but I want to redo it
 *   
for(var i = 0; i < numScripts -1; i++){
    console.log(scriptToBeRun[i]);
    runningScripts[i] = spawn('python', ['-u' , scriptToBeRun[i]]);
    
    runningScripts[i].stdout.on('data', function(data) {
        console.log("Pushing out data for " + runningScripts[i] + " " + data)
    });
    
    runningScripts[i].stderr.on('data', function(err){
        console.log("There was an error: " + err)
    });
}
*/
