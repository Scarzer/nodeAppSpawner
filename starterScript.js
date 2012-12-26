/*  This is a simple node script that starts a whole bunch of other programs
 *  It does this by reading a small file, shoves the 
 *
 */


var fs = require('fs'),
    spawn = require('child_process').spawn,
    http = require('http')
    runningScripts= [];

// This is supposed to be a blocking operation. Don't start anything till this finishes!
var scriptToBeRun = fs.readFileSync('scripts.txt').toString().split("\n");

console.log(scriptToBeRun[1])

numScripts = scriptToBeRun.length;
console.log(numScripts);

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


