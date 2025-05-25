# Real-Time Chat Application

A modern, real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and enhanced with Socket.IO for instant messaging capabilities.

## 🚀 Features

- Real-time messaging with Socket.IO
- Modern and responsive UI with Tailwind CSS
- User authentication and authorization
- Real-time notifications
- Message history persistence
- User presence status
- Group chat capabilities

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO
- **Authentication**: JWT

## 📦 Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/sunil18051998/ChatAppReactNode.git
cd ChatAppReactNode
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=your_port_number
```

4. Start the development servers
```bash
# Start backend server
cd server
npm run dev

# Start frontend development server
cd ../client
npm start
```

## 🌐 Live Demo

Access the live version of the application at:
https://chat-app-react-node-alpha.vercel.app/login

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 🎯 Future Improvements

- File sharing capabilities
- Video/Audio calling
- Message reactions
- Dark mode support
- Mobile app development
- Advanced search functionality
