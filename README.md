# RideShare-Backend

A simple app for implementing a basic situation of a ride share app.

This App is using express js  as backend. 
There is a file called client.js which is acting as our client bot. The client bot sends requests to the server and the server checks the db after every 5 sec and matches 
a rider with driver and emmits the changes through socket.

Technologies used

* express
* socket.io
* socket.io-client
* mongoose
* node-schedule
* http

# Commands for running

'npm run start' for running the server 

'node client.js' for running the client

