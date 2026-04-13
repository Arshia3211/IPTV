# Boilerplate Express Backend API:

## Description

This is a boilerplate for backend project using ExpressJS, Joi, Mongoose, JWT, Bcrypt, Services, Controllers, Routes, etc. 

## Run Project

### 1. Clone the project

### 2. Install packages

```bash
npm install
```

### 3. Run the project

```bash
npm run start
```

Or if you want to run the project in development mode

```shell
npm run dev
```

## Project Structure

Updated IPTV backend with Multer file uploads.

**File Uploads:**
- POST `/upload` - General files (images/videos)
- POST `/series/create` - `poster` image + body
- POST `/episode/create` - `thumbnail` image + body  
- Files served at `/uploads/[filename]`

```md 
├── node_modules
├── src
│   ├── config
│   │   ├── env.js
│   │   ├── index.js
│   ├── constants
│   │   ├── error-codes.js
│   │   ├── index.js
│   │   ├── misc.js
│   │   ├── success-codes.js
│   ├── controllers
│   │   ├── episode.controller.js
│   │   ├── file.controller.js
│   │   ├── genre.controller.js
│   │   ├── index.js
│   │   ├── series.controller.js
│   ├── loaders
│   │   ├── express.js
│   │   ├── index.js
│   │   ├── mongoose.js
│   │   ├── static.js  # Serves /uploads
│   ├── middleware
│   │   ├── multer.js  # uploadImage/video/file
│   ├── models
│   │   ├── episode.model.js
│   │   ├── file.model.js
│   │   ├── index.js
│   │   ├── series.model.js
│   ├── routes
│   │   ├── episode.route.js
│   │   ├── file.route.js
│   │   ├── index.js
│   │   ├── series.route.js
│   ├── services
│   │   ├── episode.service.js
│   │   ├── file.service.js
│   │   ├── index.js
│   │   ├── series.service.js
│   ├── utils
│   │   ├── httpResponse.js
│   │   ├── index.js
│   ├── validations
│   │   ├── index.js
│   ├── index.js
├── uploads/  # Uploaded files
├── TODO.md
├── package.json (multer included)
```



