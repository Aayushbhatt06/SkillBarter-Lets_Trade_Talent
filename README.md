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
├── .gitignore
├── DOCS/
│   └── Home Layout.png
├── README.md
├── backend/
│   ├── .gitignore
│   ├── Controllers/
│   │   ├── AuthController.js
│   │   ├── ConnectionController.js
│   │   ├── Posts.js
│   │   ├── Socket/
│   │   │   ├── ChatController.js
│   │   │   └── socket.js
│   │   ├── addProject.js
│   │   ├── addSkill.js
│   │   ├── check.js
│   │   ├── contriController.js
│   │   ├── editProfile.js
│   │   ├── fetchProfile.js
│   │   ├── fetchProject.js
│   │   ├── projectSkills.js
│   │   └── tagline.js
│   ├── Middlewares/
│   │   ├── AuthValidation.js
│   │   ├── LoggedInOnly.js
│   │   └── multer_upload.js
│   ├── Models/
│   │   ├── Comments.js
│   │   ├── Connection.js
│   │   ├── Like.js
│   │   ├── PendingUser.js
│   │   ├── Proj_Contri.js
│   │   ├── User.js
│   │   ├── db.js
│   │   ├── messages.js
│   │   ├── posts.js
│   │   ├── projects.js
│   │   └── tagline.js
│   ├── Routes/
│   │   ├── ApiRouter.js
│   │   ├── AuthRouter.js
│   │   ├── ContributionsRouter.js
│   │   ├── chatRouter.js
│   │   ├── connectionRoute.js
│   │   └── profileRoutes.js
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── temp_profiles/
│   │   └── temp.txt
│   └── utils/
│       ├── SendGridMail.js
│       └── cloudinary.js
└── frontend/
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public/
    │   ├── Spinner.gif
    │   ├── image.png
    │   ├── project.png
    │   └── vite.svg
    ├── src/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── Redux/
    │   │   ├── store.js
    │   │   └── userSlice.js
    │   ├── assets/
    │   │   ├── SkillMate.png
    │   │   └── react.svg
    │   ├── components/
    │   │   ├── CommentCard.jsx
    │   │   ├── Contribution.jsx
    │   │   ├── EditProfile.jsx
    │   │   ├── Home.jsx
    │   │   ├── InstantPost.jsx
    │   │   ├── Login.jsx
    │   │   ├── Message.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── NewProject.jsx
    │   │   ├── Notification.jsx
    │   │   ├── Post.jsx
    │   │   ├── PostCard.jsx
    │   │   ├── PostFeed.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Profile_Inspect.jsx
    │   │   ├── ProjectCard.jsx
    │   │   ├── ProjectFeed.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── SendConnection.js
    │   │   ├── Sidebar.jsx
    │   │   └── Signup.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   └── sources/
    │       └── svg/
    │           └── hamburger.svg
    ├── utils/
    │   ├── Socket.js
    │   └── base.js
    ├── vercel.json
    └── vite.config.js

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

- [ ] Advanced search
- [ ] Team project management
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
- Email: aayushbhatt28306@gmail.com (update with actual email)

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
