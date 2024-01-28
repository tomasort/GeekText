# GeekText Server-Side Application README

## Introduction
This README document provides an overview of the server-side functionality of the "GeekText" bookshop web application.

## Tech Stack
- **Language**: Python
- **Framework**: Flask
- **Database**: SQLite

## Setup and Installation
1. Ensure Python and Flask are installed.
2. Clone the repository and navigate to the server-side directory.
3. Install required dependencies: `pip install -r requirements.txt`.

## Database Configuration
- Use SQLite for database management.
- Database initialization scripts are included in the `db` folder.

## Running the Server
- Run the server using the command: `python app.py`.
- The server will start on `localhost` with a predefined port.

## Features
- API endpoints for book data retrieval and management.
- User authentication and session management.
- Comment, rating, and book description functionalities.

## Contribution Guidelines
- Follow Python and Flask best practices.
- Ensure code is well-commented and documented.

For detailed documentation and further assistance, refer to the project's main documentation or contact the development team.


#### Dependencies: 
* pip3 install flask
* pip3 install flask_sqlalchemy
* pip3 install Flask-Migrate
* pip3 install Flask-WTF
* pip3 install flask-login
* pip3 install flask-bcrypt

#### Running the program:

```$ python3 run.py```

#### Cleaning up cached and other garbage files (RUN THIS BEFORE EVERY PUSH):

```$ find . | grep -E "(__pycache__|\.pyc|\.pyo$|\.orig)" | xargs rm -rf```
