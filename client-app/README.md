# GeekText Frontend Application README

## Introduction
Welcome to the frontend section of the GeekText bookshop web application. This guide will help you set up and run the frontend part of our application.

## Technology Stack
- **React**: Used for building the user interface.
- **Bootstrap**: For styling and responsive design.

## Setup and Installation
1. **Clone the Repository**: Start by cloning the repo to your local machine.
2. **Install Dependencies**: Navigate to the frontend directory and run `npm install` to install all the necessary dependencies.

## Configuration for Local Development
- **Local Domain Setup**: To handle cookies in a local environment, you'll need to set up a local domain. Add `127.0.0.1 geek.localhost.com` to your `etc/hosts` file.
- **Environment Variable**: In `package.json`, under the "scripts" section, set the `HOST` environment variable as `"start": "HOST=geek.localhost.com react-scripts start"`.

## Running the Application
- **Starting the App**: Use the command `npm start` to run the application. It will launch the app on the `geek.localhost.com` domain.

## Further Help and Documentation
- For more information, refer to the React documentation and the specific sources listed in the repository for handling cookies and domain settings.

This README aims to streamline your setup process and provide clear instructions for running the GeekText frontend application effectively.
