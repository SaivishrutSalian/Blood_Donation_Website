Project Setup Instructions
1. Install Dependencies
Navigate to all 3 directories using the cd command, then run npm install in each directory to install the dependencies.

bash
Copy
cd Backend
npm install

cd ../BackgroundServices
npm install

cd ../Frontend
npm install
2. Set Up .env Files
You need to set up .env files in the Backend and BackgroundServices directories.

.env in Backend:
plaintext
Copy
PORT=your_port_here
PASS=your_password_here
JWT_SEC=your_jwt_secret_here
DB=your_database_connection_string_here
.env in BackgroundServices:
plaintext
Copy
DB=your_database_connection_string_here
PORT=your_port_here
EMAIL=your_email_here
PASSWORD=your_app_password_here  # (Generated app password for the email used)
3. Run the Directories Separately
After setting up the .env files, you need to run each directory separately.

Backend
bash
Copy
cd Backend
node index.js
BackgroundServices
bash
Copy
cd BackgroundServices
node index.js
Frontend
For the frontend, run the following command to start the development server:

bash
Copy
cd Frontend
npm run dev
