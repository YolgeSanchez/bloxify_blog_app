# Bloxify Blog App

Bloxify is a full-stack blog application built with Node.js, Express.js, and React.js. It allows users to create an account, upload an avatar, create and edit blog posts, like and unlike posts, and view their profile and liked posts.

## 🌟 Features

- User authentication and authorization
- Avatar upload and display
- Blog post creation, editing, and deletion
- Liking and unliking posts
- Profile and liked posts views
- Responsive design for mobile and desktop devices

## 🚀 Quick Start

### Clone the Repository

```
git clone https://github.com/YolgeSanchez/BlogApp.git

```

### Install Dependencies

```
npm install | npm i
cd client
npm install | npm i
```

### Run the project server and client

```
npm run dev // in the main directory
cd client // in another terminal
npm run dev // again but in the client directory
```

### Configure Environment Variables

Create a `.env` file in the root directory and add the following:

To run Bloxify, you need to set up the following environment variables:

```
FTP_HOST: The hostname or IP address of your FTP server
FTP_USER: The username for your FTP server
FTP_PSSWD: The password for your FTP server
FTP_PORT: The port number for your FTP server (default is 21)
MONGO_DB_CONNECTION: The connection string for your MongoDB database
CORS_ORIGIN: The origin URL for CORS (default is http://localhost:5173)
```

## 📁 FTP Server
To use Bloxify, you need to set up an FTP server with a virtual folder route of /uploads, this ftp server is the one who manage the images uploaded by the users for posts or avatars

## 🛠️ Technologies Used

- vite (for the client setup)
- ReactJS
- ShadcnUI
- TailwindCSS
- React hook form
- Node.js
- Express.js
- MongoDB
- Mongoose
- basic-ftp (for the ftp connection and use)
- ZOD (for data validation)
- JSON Web Tokens (JWT)
- Multer (for images uploads)

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

---

Happy coding! If you liked this project, please consider giving it a star on GitHub.
