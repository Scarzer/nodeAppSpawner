##  Node App Spawner



### Introduction
This is a simple node script that starts a whole bunch of other programs
It does this by reading a small file, with the names of the scripts to be run
Once running, the scripts dump their stdOut, stdErr, PID, and name into a JSON

The JSON then gets broadcasted via socket.io (voliatile message)
This is quite useful for launching/testing/watching daemon processes

### Current Capabilities List
- Only autoruns Python scripts in unbuffered mode
- Turn on arbitrary number of scripts
- Broadcast via socket it's name, PID, stdout + stderr
- Upon catastrophic error, the name is marked with an error property

### Todo:
- Set up an interface
- Allow for the interface to restart programs that suffer from a failure
- Detect what enviroment is needed based on the extension of the file
- MAKE A FUCKING INTERFACE!!!!

### Change Log
**Version 0.0.4
Inital Commit

**Version 0.0.5
Optimization in the socket broadcasting. Responds to number of connected clients


## License 

(The MIT License)

Copyright (c) 2013 Irving Derin &lt;Irving.Derin@gmail.com &gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
