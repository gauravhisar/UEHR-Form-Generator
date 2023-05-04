# EHR_Form_Generator

#### Installation Manual 
## Project Name - Usability in EHR (UEHR)

Pre-requisites: 

1.	Java 11 or above
2.	Maven 3
3.	MongoDB Community Server and MongoDB Compass (To manage MongoDB)
4.	Nodejs and npm
5.	Nginx

Components:

1.	MongoDB (as database)
2.	React Frontend 
3.	Nodejs Backend
4.	Snowstorm
5.	Elasticsearch 7.1.0 (as a component of Snowstorm)
6.	Nginx (used as a proxy server for Snowstorm)

Installation Steps:

•	Snowstorm: 

1.	Follow the steps given in the Readme file of the GitHub repository given below.
https://github.com/IHTSDO/snowstorm/blob/master/docs/getting-started.md

2.	Download and start Elasticsearch 7.1.0 server.
3.	Download the snowstorm jar file mentioned in the Readme file and run it. Make sure to remove “--snowstorm.rest-api.readonly=true” option while running the snowstorm server.
4.	Download the International Snowstorm release files from this website -https://mlds.ihtsdotools.org/#/landing

5.	To download the release files, first you will have to login in the website and request for the access of release files by submitting an application.
6.	Application will get approved in 2-3 days, after which download the release files and load them in the snowstorm server following the steps mentioned in the readme file.
7.	Also Download Nginx and paste the configurations given in the Readme file in the “nginx.conf” file. To avoid CORS problem, add this to nginx - 
“ Access-Control-Allow-Origin: * ” 


•	Frontend: 
1.	Clone the repository from the given GitHub link.
https://github.com/gauravhisar/EHR_Form_Generator 
2.	Run “npm start” inside the “EHR_Form_Generator” Directory. Frontend will run at port 3000 by default.

•	Backend:
1.	To run the backend, go inside the backend folder of the same repository and run “npm start”. Backend will run at 5001 port by default.

	Data is saved inside MongoDB which is visible in MongoDB compass.
	To move further with the code, fork the GitHub repository into your own GitHub repository and do the changes as necessary
![image](https://user-images.githubusercontent.com/56959589/236198276-d8ee7e94-6cc1-41d0-9b29-90e65ec53e65.png)
