/*  This is a simple node script that starts a whole bunch of other programs
 *  It does this by reading a small file, shoves the 
 *
 */


var fs = require('fs'),
    spawn = require('child_process').spawn,
    http = require('http')
    runningScripts= [],
    Statuses = {};



// This is supposed to be a blocking operation. Don't start anything till this finishes!
var scriptToBeRun = fs.readFileSync('scripts.txt').toString().split("\n");
scriptToBeRun.pop() // Get rid of the blank spot at the end

var numScripts = scriptToBeRun.length;
var index = 0

console.log(numScripts);
console.log(scriptToBeRun)


for(var i = 0; i < numScripts ; i++){

    runningScripts[i] = spawn('python', ['-u',scriptToBeRun[i] ]); //Creates the scripts

    processName = scriptToBeRun[i];

    Statuses[scriptToBeRun[i]] = {processName : {"Name" : scriptToBeRun[i], "PID" : runningScripts[i].pid}};

}

for(var i = 0; i < runningScripts.length ; i++){
        var index = i     
        runningScripts[i].stdout.on("data", closureCallback(index, Statuses, scriptToBeRun))
    };


setInterval(function(){
    console.log(Statuses); 
    console.log("-----------------------------------");
    }, 1000);

function closureCallback(index, json_Stats, scriptsList){
    return function(data){
        console.log("Index: " + index);
        console.log("Statuses: " + json_Stats);
        console.log("Data: " + data);
        console.log("Scripts: " + scriptsList[index]);
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
