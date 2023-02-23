# urlShortener


Instructions on how to run the code
What we have to do before my URL-shortener can be run on any computer is to have a locally running mongo-db. Some people (like me) have problem with Mongo-db shell so I suggest they install Mongoosh, which is just a newer version of mongo-db with few improvements. Mongosh worked like a charm. PREREQUISITES: - have vscode, node.js, mongo-db and mongosh installed on your system and of course source code that you downloaded from https://github.com/Borkobas/urlShortener. Also, you will need to install any needed node.js libraries by running command "npm install" from the root folder of my project. What we have to do is install Vscode extension called "MongoDB for VS Code" and connect it to the local instance of mongo-db database that we will start in the background. 1. To create a sample database named myDatabase locally, we will use mongosh (I suppose you have it installed already). Open the terminal and type: "mongosh" you should end up with "test >". To create a new database, run the following command "use myDatabase". This automatically creates a new database called myDatabase for us. this should be the connecting link for it: mongodb://localhost:27017/myDatabase - localhost part says we are running it locally on our computer and not on a remote server. - 27017 is the default port of mongo-db. - myDatabase is the name of our database. Now we will have to connect it to our URL- shortener project. 2. Open the extension tab on VS Code and
              search for "MongoDB for VS Code." Logo of the extension is a green leaf. Install it. Under "Connect with Connection String" click Connect button. Up, above MongoDB link there is an address bar, write the address from before there: mongodb://localhost:27017/myDatabase Upon a successful connection, you should see a green circle and text that says connected to localhost:27017/ Congratulations! You have just created a local MongoDB database and connected to it from VS Code, successfully! Now you should be able to run my code from the root directory by entering the following command into the terminal:
npm run dev after that all you have to do is open any of the web browsers and type the following address: http://localhost:3001/ TROUBLESHOOTING: If the code does not start and you get errors with the database, it could be that urlShortener/models/.env is missing or is not configured correctly. Create it, if it is missing. Its content should be: MONGO_DB_URI = "mongodb://localhost:27017/URL-shortener" If you have problems installing any of the packages, you probably have a problem with elevated permission, if you are using windows, run cmd as administrator and if you are using mac, like me, use sudo in front of commands, with some of the commands you might get warning/error that says you should not use sudo because of safety. If you get that error, type the command again, this time without sudo.
