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
var numScripts = scriptToBeRun.length;
console.log(numScripts);
console.log(scriptToBeRun)


for(var i = 0; i < numScripts - 1 ; i++){
    // minus 1 numScripts cause last element is empty
   
    /* Current status of this point,
     * I am unable to get the eventhandlers to be initialized... atleast that's what I think's happening
     * I have the json Statuses working, and it has the initalization portion of it done, but the inner 
     * object is still empty :/ I'm missing something!!
     *
     */
    Statuses[scriptToBeRun[i]] = {} ;
    if(scriptToBeRun === undefined){
    console.log("Spawning: " + scriptToBeRun[i]);
    Statuses[scriptToBeRun[i]]["Name"] = scriptToBeRun[i];

    runningScripts[i] = spawn('python', ['-u' , scriptToBeRun[i] ] );
    Statuses[scriptToBeRun[i]]["State"] = "Operational";
    
    console.log("Setting up handlers");
    runningScripts[i].stdout.on('data', function(data) {
        Statuses[scriptToBeRun[i]]["Data"] = data;
        });

    runningScripts[i].stderr.on('err', function(error) {
        console.log(error);
        Statuses[scriptToBeRun[i]]["ErrData"] = error;
        Statuses[scriptToBeRun[i]]["State"] = "Error";
    });
}};


setInterval(function(){
    console.log(Statuses); 
    console.log("-----------------------------------");
    }, 1000);




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

