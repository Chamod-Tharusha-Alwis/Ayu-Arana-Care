# ⚙️ Installation & Setup
Follow these steps to run the project locally on your machine.

1. Prerequisites
Node.js installed on your machine.

A MongoDB Atlas account and cluster.

2. Clone the Repository
Bash
git clone [https://github.com/Chamod-Tharusha-Alwis/Ayu-Arana-Care.git](https://github.com/Chamod-Tharusha-Alwis/Ayu-Arana-Care.git)
cd Ayu-Arana-Care
3. Backend Setup
Navigate to the server directory, install dependencies, and configure your environment variables.

Bash
cd server
npm install
Create a .env file in the root of the server folder and add the following variables:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_app_password
FRONTEND_URL=http://localhost:5173
Start the backend server:

Bash
npm start

4. Frontend Setup
Open a new terminal window, ensure you are in the root project directory (AyuAranaCare), and install the frontend dependencies.

Bash
npm install
Start the Vite development server:

Bash
npm run dev
The frontend will typically run at http://localhost:5173.

# ✨ Key Features
Role-Based Authentication: Secure login for Admins, Staff, and Users/Family members using JWT.

Resident Management: Track resident details, center assignments, and daily logs.

Medical Records & Announcements: Dedicated modules for updating and viewing resident medical status.

Membership & Payments: Handle facility memberships and process billing/payments.

Communication: Integrated contact forms, feedback systems, and email notifications via Nodemailer.

Careers Portal: Built-in module for viewing and applying for open positions at the care center.
