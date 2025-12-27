# 🚀 SkillMate - Let's Trade Talent

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://skillmate-plum.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/Aayushbhatt06/SkillMate-Lets_Trade_Talent?style=social)](https://github.com/Aayushbhatt06/SkillMate-Lets_Trade_Talent/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> A modern tech-focused social media platform that connects developers and tech enthusiasts through skill-based collaboration and intelligent project recommendations with real-time messaging capabilities.

## 📋 Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Socket.io Events](#socketio-events)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

SkillMate is an innovative social networking platform designed specifically for the tech community. It leverages intelligent algorithms to match users with skill-aligned projects and collaboration opportunities. Whether you're looking to contribute to open-source projects, find collaborators for your next big idea, or simply connect with like-minded developers, SkillMate makes it seamless.

### Why SkillMate?

- **🎯 Smart Matching**: Mongoose query powered Project recommendations based on your skills.
- **💬 Real-time Chat**: Instant messaging with Socket.io for seamless collaboration
- **🤝 Project Discovery**: Find projects that match your expertise and learning goals
- **📊 Skill Development**: Track your growth and discover new technologies
- **🌐 Community Building**: Connect with developers who complement your skill set
- **🖼️ Rich Profiles**: Showcase your work with profile pictures and comprehensive profiles

## ✨ Key Features

### 🔐 Authentication & Security
- Secure user registration and login with JWT
- Password encryption using bcrypt
- Cookie-based authentication with cookie-parser
- Protected routes and middleware

### 👤 User Profiles & Management
- Comprehensive user profiles with skill sets
- Profile picture upload with Multer
- Cloud storage integration with Cloudinary
- Bio, skills, and technology preferences
- Project showcase and portfolio

### 🤝 Smart Project Recommendations
- Algorithm-based project matching
- Skill-aligned collaboration suggestions
- Experience level filtering
- Interest-based recommendations
- Real-time project feed updates

### 💬 Real-time Communication
- Instant messaging powered by Socket.io
- One-on-one conversations
- Message persistence with MongoDB
- Online/offline status indicators
- Real-time notifications
- Typing indicators

### 🖼️ Media Management
- Profile picture uploads with Multer
- Image optimization and storage via Cloudinary
- Support for multiple image formats
- Secure file handling and validation

### 🔔 Notifications & Updates
- Real-time push notifications
- Collaboration request alerts
- Message notifications
- Project update notifications

### 🔍 Search & Discovery
- Advanced user search
- Project filtering by skills
- Technology stack-based discovery
- Collaboration opportunity matching

## 🛠️ Tech Stack

### Frontend
```
├── React 19.1.0               # Latest React with modern features
├── Vite 7.0.4                 # Ultra-fast build tool
├── Redux Toolkit 2.9.0        # State management
├── React Router DOM 7.8.1     # Client-side routing
├── Socket.io Client 4.8.1     # Real-time communication
├── Tailwind CSS 4.1.12        # Utility-first CSS framework
├── Lucide React 0.541.0       # Beautiful icon library
├── Lenis                      # Smooth scrolling
└── ESLint                     # Code quality
```

### Backend
```
├── Node.js                    # Runtime environment
├── Express 5.1.0              # Web framework
├── MongoDB (Mongoose 8.17.0)  # Database & ODM
├── Socket.io 4.8.1            # WebSocket server
├── JWT (jsonwebtoken 9.0.2)   # Authentication tokens
├── Bcrypt 6.0.0               # Password hashing
├── Multer 1.4.4               # File upload handling
├── Cloudinary 2.7.0           # Cloud image storage
├── Cookie Parser 1.4.7        # Cookie handling
├── Cors 2.8.5                 # Cross-origin support
├── Joi 18.0.0                 # Data validation
├── SendGrid 8.1.6             # Email service
├── Compression 1.8.1          # Response compression
└── Dotenv 17.2.1              # Environment variables
```

### Development Tools
```
├── Nodemon                    # Auto-restart server
├── Vite                       # Frontend dev server
└── ESLint                     # Code linting
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary Account** (for image storage)
- **SendGrid Account** (for email services, optional)
- **Git**

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Aayushbhatt06/SkillMate-Lets_Trade_Talent.git
cd SkillMate-Lets_Trade_Talent
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
touch .env
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
touch .env
```

#### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

#### 5. Access the Application
- **Frontend**: `http://localhost:5173` (Vite default port)
- **Backend API**: `http://localhost:5000` (or your configured PORT)

## 📁 Project Structure

```
SkillMate-Lets_Trade_Talent/
│
├── backend/
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   └── cloudinary.js            # Cloudinary configuration
│   │
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   ├── userController.js        # User CRUD operations
│   │   ├── projectController.js     # Project management
│   │   ├── messageController.js     # Chat functionality
│   │   └── notificationController.js # Notifications
│   │
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Project.js               # Project schema
│   │   ├── Message.js               # Message schema
│   │   ├── Notification.js          # Notification schema
│   │   └── Collaboration.js         # Collaboration schema
│   │
│   ├── routes/
│   │   ├── auth.js                  # Auth endpoints
│   │   ├── users.js                 # User endpoints
│   │   ├── projects.js              # Project endpoints
│   │   ├── messages.js              # Message endpoints
│   │   └── notifications.js         # Notification endpoints
│   │
│   ├── middleware/
│   │   ├── auth.js                  # JWT verification
│   │   ├── upload.js                # Multer configuration
│   │   ├── validate.js              # Joi validation
│   │   └── errorHandler.js          # Error handling
│   │
│   ├── utils/
│   │   ├── recommendation.js        # Matching algorithm
│   │   ├── validators.js            # Input validators
│   │   ├── emailService.js          # SendGrid integration
│   │   └── helpers.js               # Helper functions
│   │
│   ├── socket/
│   │   └── socketHandler.js         # Socket.io logic
│   │
│   ├── .env                         # Environment variables
│   ├── index.js                     # Entry point
│   └── package.json                 # Dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   ├── ProfileCard.jsx
│   │   │   │   ├── ProfileEdit.jsx
│   │   │   │   └── SkillsSection.jsx
│   │   │   │
│   │   │   ├── projects/
│   │   │   │   ├── ProjectCard.jsx
│   │   │   │   ├── ProjectList.jsx
│   │   │   │   ├── ProjectDetail.jsx
│   │   │   │   └── CreateProject.jsx
│   │   │   │
│   │   │   ├── chat/
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   ├── MessageList.jsx
│   │   │   │   ├── MessageInput.jsx
│   │   │   │   └── ConversationList.jsx
│   │   │   │
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── ErrorBoundary.jsx
│   │   │   │
│   │   │   └── recommendations/
│   │   │       ├── RecommendationCard.jsx
│   │   │       └── RecommendationList.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── Recommendations.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   │── userSlice.js
│   │   │   └── index.js
│   │   │
│   │   │
│   │   ├── utils/
│   │   │   ├── base.js
│   │   │   ├── socket.js
│   │   │
│   │   ├── styles/
│   │   │   └── index.css             # Global styles
│   │   │
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # Entry point
│   │   └── vite-env.d.ts
│   │
│   ├── .env                          # Environment variables
│   ├── package.json                  # Dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind configuration
│   ├── eslint.config.js              # ESLint configuration
│   └── index.html
│
├── DOCS/                             # Documentation
├── .gitignore
├── README.md
└── LICENSE
```

## 🔧 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory with the following variables:

```env
SECRET={Your Secret}
PORT={Port Number}
CLOUD_NAME={name of cloud}
CLOUDINIARY_KEY={Key}
CLOUDINIARY_SECRET={Secret}
HASH={hashing key}
MONGO_CONN={mongo connection string}
SENDGRID_API_KEY={API key for Sending Main if using otp verification}
SENDGRID_VERIFIED_EMAIL={Verified sender mail for sending OTP}

```

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL={Backend url}
VITE_FRONTEND_URL={Frontend url}
```

## 📡 API Endpoints

### Authentication Routes

#### Register User
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "skills": ["JavaScript", "React", "Node.js"],
  "bio": "Full-stack developer passionate about web technologies"
}

Response: 201 Created
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

#### Logout User
```http
POST /auth/logout
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Logged out successfully"
}
```

### User Routes

#### Get User Profile
```http
GET /api/users/:userId
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Full-stack developer",
    "skills": ["JavaScript", "React", "Node.js"],
    "profilePicture": "https://cloudinary.com/...",
    "projects": [...]
  }
}
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
- name: "John Doe"
- bio: "Updated bio"
- skills: ["JavaScript", "React", "Node.js", "MongoDB"]
- profilePicture: <file>

Response: 200 OK
{
  "success": true,
  "user": { ... }
}
```

#### Get Recommendations
```http
GET /api/users/recommendations
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "recommendations": [
    {
      "user": { ... },
      "matchScore": 85,
      "commonSkills": ["JavaScript", "React"],
      "projects": [...]
    }
  ]
}
```

### Project Routes

#### Get All Projects
```http
GET /api/projects
Authorization: Bearer <token>
Query Parameters:
- page: 1
- limit: 10
- skills: JavaScript,React
- search: e-commerce

Response: 200 OK
{
  "success": true,
  "projects": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50
  }
}
```

#### Create Project
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "E-commerce Platform",
  "description": "Building a modern e-commerce solution",
  "techStack": ["React", "Node.js", "MongoDB"],
  "lookingFor": ["Frontend Developer", "UI Designer"],
  "requirements": {
    "experience": "intermediate",
    "timeCommitment": "10 hours/week"
  }
}

Response: 201 Created
{
  "success": true,
  "project": { ... }
}
```

#### Get Project Details
```http
GET /api/projects/:projectId
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "project": {
    "id": "project_id",
    "title": "E-commerce Platform",
    "description": "...",
    "owner": { ... },
    "collaborators": [...],
    "techStack": [...],
    "status": "active"
  }
}
```

#### Update Project
```http
PUT /api/projects/:projectId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "completed"
}

Response: 200 OK
{
  "success": true,
  "project": { ... }
}
```

#### Delete Project
```http
DELETE /api/projects/:projectId
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Project deleted successfully"
}
```

### Message Routes

#### Send Message
```http
POST /api/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "receiverId": "user_id",
  "content": "Hey! Interested in collaborating on your project."
}

Response: 201 Created
{
  "success": true,
  "message": {
    "id": "message_id",
    "sender": "sender_id",
    "receiver": "receiver_id",
    "content": "...",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Conversations
```http
GET /api/messages/conversations
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "conversations": [
    {
      "user": { ... },
      "lastMessage": { ... },
      "unreadCount": 3
    }
  ]
}
```

#### Get Messages with User
```http
GET /api/messages/:userId
Authorization: Bearer <token>
Query Parameters:
- page: 1
- limit: 50

Response: 200 OK
{
  "success": true,
  "messages": [...],
  "pagination": { ... }
}
```

### Notification Routes

#### Get Notifications
```http
GET /api/notifications
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "notifications": [
    {
      "id": "notif_id",
      "type": "collaboration_request",
      "message": "User requested to collaborate",
      "read": false,
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Mark as Read
```http
PUT /api/notifications/:notificationId/read
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Notification marked as read"
}
```

## 🔌 Socket.io Events

### Client to Server Events

```javascript
// Connect to socket
socket.connect();

// Join user room
socket.emit('join', { userId: 'user_id' });

// Send message
socket.emit('sendMessage', {
  receiverId: 'receiver_id',
  message: 'Hello there!'
});

// Typing indicator
socket.emit('typing', {
  receiverId: 'receiver_id',
  isTyping: true
});

// Stop typing
socket.emit('stopTyping', {
  receiverId: 'receiver_id'
});

// Mark online
socket.emit('userOnline', { userId: 'user_id' });

// Mark offline
socket.emit('userOffline', { userId: 'user_id' });
```

### Server to Client Events

```javascript
// Receive message
socket.on('receiveMessage', (data) => {
  console.log('New message:', data);
  // data: { sender, message, timestamp }
});

// User online status
socket.on('userOnline', (data) => {
  console.log('User is online:', data.userId);
});

// User offline status
socket.on('userOffline', (data) => {
  console.log('User is offline:', data.userId);
});

// Typing indicator
socket.on('userTyping', (data) => {
  console.log('User is typing:', data.userId);
});

// Stop typing
socket.on('userStoppedTyping', (data) => {
  console.log('User stopped typing:', data.userId);
});

// New notification
socket.on('notification', (data) => {
  console.log('New notification:', data);
  // data: { type, message, link }
});

// Collaboration request
socket.on('collaborationRequest', (data) => {
  console.log('New collaboration request:', data);
});

// Error handling
socket.on('error', (error) => {
  console.error('Socket error:', error);
});
```

## 🔒 Security Features

- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Cookie Security**: HTTP-only cookies with secure flags
- **Input Validation**: Joi schema validation
- **File Upload Security**: Multer with file type and size restrictions
- **CORS Protection**: Configured cross-origin resource sharing
- **XSS Protection**: Sanitized user inputs
- **Rate Limiting**: API rate limiting (recommended to implement)
- **Environment Variables**: Sensitive data in .env files

## 🎨 Recommendation Algorithm

🔍 How Matching Works

1. **Each project defines a list of required skills**

  -  The system compares these required skills with the skills listed in the user profile

  -  A match is counted when a required skill exists in the user’s skill set

2. **Experience Level** (20% weight)
   - Matches compatible experience ranges
   - Considers learning opportunities

3. **Interest Alignment** (20% weight)
   - Analyzes project types and domains
   - Technology preferences matching

4. **Activity Level** (10% weight)
   - Recent platform engagement
   - Response rate and availability

5. **Project Compatibility** (10% weight)
   - Time commitment alignment
   - Location preferences (if applicable)

**Scoring**: 0-100 scale, threshold of 60+ for recommendations

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd frontend
vercel --prod
```

3. **Environment Variables**
   - Add all VITE_* variables in Vercel dashboard
   - Update VITE_API_URL to production backend URL

### Backend Deployment (Railway/Render/Heroku)

#### Option 1: Railway

1. Install Railway CLI
```bash
npm install -g @railway/cli
```

2. Login and deploy
```bash
railway login
railway init
railway up
```

3. Add environment variables in Railway dashboard

#### Option 2: Render

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Whitelist IP addresses or allow all (0.0.0.0/0 for development)
3. Get connection string
4. Update MONGODB_URI in backend .env

### Cloudinary Setup

1. Sign up for Cloudinary account
2. Get cloud name, API key, and API secret
3. Add to backend .env file
4. Configure upload presets (optional)

## 📊 Features in Development

- [ ] Advanced search with filters
- [ ] Team project management
- [ ] Video call integration
- [ ] Code snippet sharing
- [ ] Project analytics dashboard
- [ ] Reputation system
- [ ] Skill endorsements
- [ ] Resource sharing
- [ ] Event calendar for tech meetups

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
```bash
git clone https://github.com/Aayushbhatt06/SkillMate-Lets_Trade_Talent.git
```

2. **Create Feature Branch**
```bash
git checkout -b feature/AmazingFeature
```

3. **Commit Changes**
```bash
git commit -m 'Add some AmazingFeature'
```

4. **Push to Branch**
```bash
git push origin feature/AmazingFeature
```

5. **Open Pull Request**

### Coding Guidelines

- Follow existing code style
- Write meaningful commit messages
- Comment complex logic
- Update documentation
- Test before submitting PR
- Use ESLint for code quality

### Areas for Contribution

- Bug fixes
- New features
- Documentation improvements
- UI/UX enhancements
- Performance optimizations
- Test coverage

## 🐛 Known Issues

- WebSocket connection might drop on certain networks (implementing reconnection logic)
- Large image uploads may take time (optimization in progress)
- Mobile responsiveness improvements needed for some components

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aayush Bhatt**

- GitHub: [@Aayushbhatt06](https://github.com/Aayushbhatt06)
- Project Link: [SkillMate Repository](https://github.com/Aayushbhatt06/SkillMate-Lets_Trade_Talent)
- Live Demo: [skillmate-plum.vercel.app](https://skillmate-plum.vercel.app)

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- All open-source contributors

## 📞 Support

For support and questions:
- Create an issue in the [GitHub repository](https://github.com/Aayushbhatt06/SkillMate-Lets_Trade_Talent/issues)
- Email: aayushbhatt@example.com (update with actual email)

## 📈 Project Status

**Current Version**: 1.0.0  
**Status**: Active Development  
**Last Updated**: December 2024

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Built with ❤️ by [Aayush Bhatt](https://github.com/Aayushbhatt06)**

[Report Bug](https://github.com/Aayushbhatt06/SkillMate-Lets_Trade_Talent/issues) · [Request Feature](https://github.com/Aayushbhatt06/SkillMate-Lets_Trade_Talent/issues) · [Documentation](https://github.com/Aayushbhatt06/SkillMate-Lets_Trade_Talent/tree/main/DOCS)

</div>
