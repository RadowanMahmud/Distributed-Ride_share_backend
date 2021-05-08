# RideShare-Backend

A simple app for implementing a basic situation of a ride share app.

This App is using express js  as backend. 
There is a file called client.js which is acting as our client bot. It is located in TideShare-Backend program 
The client bot sends requests to the server and the server checks the db after every 5 sec and matches 
a rider with driver and emmits the changes through socket.

About stoping the server, First we need to stop the communication server than other servers.

Technologies used

* express
* socket.io
* socket.io-client
* mongoose
* node-schedule
* http

# Commands for running

* For running the RideShare-Backend Module
  'npm run start' for running the server 

* For running the Rating Module
  'npm run start' for running the server

* For running the Communication Module
  'npm run start' for running the server

'node client.js' for running the client

The client joins with the communication module via socket.

# config for nginx 


	server {
		listen 80;
		listen [::]:80;
		
		location /api {
			proxy_pass http://rideshare-backend:5000;
		}
		
		location /rating {
			proxy_pass http://rating-module:5000;
		}
	}

# Docker compose added

Run commands for docker compose

'sudo docker-compose build'
'sudo docker-compose up'

