# Files Management API
This project provides a RESTful API for file management, allowing users to upload, retrieve, publish, and unpublish files. It is built with Express and MongoDB as the primary database, utilizing Redis for token-based authentication.

## Table of Contents
- Installation
- Environment Variables
- Usage
  - Routes
    - Status and Statistics
    - User Authentication
    - File Management
- Technologies

## Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/files-management-api.git
cd files-management-api
```
2. Install the dependencies:

```bash
npm install
```

3.Set up the environment variables: Create a .env file in the root directory with the following variables:
```bash
MONGODB_URI=your-mongodb-uri
REDIS_URI=your-redis-uri
FOLDER_PATH=/tmp/files_manager  # Directory for storing files
```


4.Run the server:

```bash
npm run start-server
```

## Environment Variables
`MONGODB_URI`: MongoDB connection string. <br>
`REDIS_URI`: Redis connection string. <br>
`FOLDER_PATH`: Directory path where the uploaded files will be stored. Defaults to /tmp/files_manager. <br>

## Usage
### Routes
Status and Statistics
- GET /status
  - Returns the status of the API ( Mongodb and Redis ).
- GET /stats
  - Returns usage statistics such as the number of users and files.

User Authentication
- POST /users
  - Creates a new user.
- GET /connect
  - Logs in a user and returns an authentication token.
- GET /disconnect
  - Logs out a user by invalidating their token.
- GET /users/me
  - Returns information about the currently authenticated user.

File Management
- POST /files
  - Uploads a new file or creates a new folder.
  - Request parameters:
    - name: Name of the file or folder.
    - type: Type of the file (folder, file, or image).
    - data: Base64-encoded file data (for file and image types).
    - isPublic: Boolean indicating whether the file is public or private.
    - parentId: ID of the parent folder (optional).
- GET /files/:id
  - Retrieves metadata of a file by its ID.
- GET /files
  - Lists files with pagination.
  - Query parameters:
    - parentId: ID of the parent folder (optional).
    - page: Pagination page number (optional, defaults to 0).
- PUT /files/:id/publish
  - Publishes a file, making it public.
- PUT /files/:id/unpublish
  - Unpublishes a file, making it private.
- GET /files/:id/data
  - Downloads the file data.
  - Query parameters:
    - size: (Optional) The size of the file if applicable.

## Technologies
- Node.js: JavaScript runtime.
- Express: Web framework for building the API.
- MongoDB: Database for storing users and file metadata.
- Redis: In-memory data store used for token-based authentication.
- Bull: A job queue for handling file processing.
- UUID: Generates unique IDs for files.
