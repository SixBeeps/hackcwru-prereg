# HackCWRU 2023 Preregistration System
This is the preregistration system for HackCWRU 2023. It is a web application that allows students to preregister for HackCWRU 2023. It is built using Next.js and MongoDB.

## Getting Started
First, clone the repository and install the dependencies with `npm install`.

Then, create a `.env.local` file in the root directory of the project. This file should contain the following environment variables:

```
MONGO_URI="MongoDB connection URL"
EMAIL_USER="Email address to send emails from"
EMAIL_PWD="Password for the email address"
BLAST_PWD="Password to check when an email blast is requested"
SIGNUP_LINK="Link to the signup form when registration opens"
```

Once you have set everything up, you may either run the development server or build the project to production.

### Development Server
Run `npm run dev` to start the development server.

### Production Build
Run `npm run build` to build the project to a folder. Then, run `npm run start` to start the production server.

## Usage
Once the server has started, the registration form is served at the root. When it is time to send out emails, the email blast page is served at `/mailblast?password=YOURPASSWORDHERE`. You may visit this page in the browser or use an application like cURL to send a GET request to the page.