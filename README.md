First have to install the dependencies. Navigate to all 3 directories using 'cd' command then 'npm install' on each directory to install the dependencies.

Set .env file in Backend and BackgroundServices 

.env in Backend:- 

PORT=

PASS=

JWT_SEC=

DB=

.env in BackgroundServices:-

DB=

PORT=

EMAIL=

PASSWORD= (it is the app password generated from the email that is used)

then run the directories seperately.

Backend:- node index.js

BackgroundServices:- node index.js

Frontend:- npm run dev


