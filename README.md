# 🔒 SilentVoice

> **Speak Freely, Stay Anonymous**

SilentVoice is a modern, privacy-focused feedback collection platform that enables organizations to gather honest opinions and feedback while maintaining complete anonymity for respondents. Built with security and user experience in mind.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://silentvoice-client.onrender.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

- 🎭 **100% Anonymous Feedback** - No tracking, no logging, complete privacy
- 🛡️ **Secure & Private** - Built with security best practices
- ⚡ **Real-time Analytics** - Instant insights with average ratings and response counts
- 🌓 **Dark Mode** - Beautiful UI with automatic theme switching
- 📊 **Interactive Dashboard** - Manage all feedback forms in one place
- ⭐ **Star Rating System** - Easy 5-star rating with optional comments
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🗑️ **Auto-Cleanup** - Inactive forms automatically deleted after 7 days
- 🔄 **Toggle Form Status** - Activate or deactivate feedback forms anytime

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Vite** - Lightning-fast build tool
- **CSS3** - Custom styling with dark mode support

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **node-cron** - Scheduled task management

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/shriom17/SilentVoice.git
cd SilentVoice
```

### Backend Setup
```bash
cd server
npm install

# Create .env file
echo "MONGO_URI=your_mongodb_connection_string" > .env
echo "PORT=5000" >> .env

npm start
```

### Frontend Setup
```bash
cd client
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

npm run dev
```

Visit `http://localhost:5173` to see the app in action!

## 🎯 Usage

### Creating Feedback Forms
1. Navigate to **Create Feedback**
2. Enter a descriptive title for your feedback form
3. Submit to create an active feedback form

### Collecting Feedback
1. Share the **Public Feedback** page link
2. Users select a feedback form
3. Rate from 1-5 stars
4. Optionally add anonymous comments
5. Submit - completely anonymous!

### Managing Feedback
1. Visit the **Dashboard**
2. View all feedback forms with statistics
3. Toggle forms active/inactive
4. View detailed analytics (average rating, response count)
5. Inactive forms auto-delete after 7 days

## 🔐 Privacy & Security

- **No User Tracking** - We don't collect IP addresses or any identifying information
- **No Authentication Required** - Anyone can submit feedback anonymously
- **Data Minimization** - Only collect ratings and optional comments
- **Automatic Cleanup** - Old inactive data is automatically removed
- **CORS Protection** - Configured to prevent unauthorized access

## 🎨 Screenshots

### Light Mode
- Clean, modern interface with intuitive navigation
- Card-based design for better organization
- Gradient navigation bar

### Dark Mode
- Easy on the eyes with carefully chosen colors
- Smooth transitions between themes
- Persistent theme preference

## 📚 API Endpoints

### Feedback Routes
```
GET    /api/feedback           # Get all feedback forms
POST   /api/feedback           # Create new feedback form
POST   /api/feedback/:id/submit # Submit anonymous feedback
GET    /api/feedback/:id/results # Get feedback results
PUT    /api/feedback/:id/toggle # Toggle form status
PUT    /api/feedback/:id/close  # Close feedback form
```

## 🚀 Deployment

### Deploy to Render

This project includes a `render.yaml` blueprint for easy deployment:

1. Push code to GitHub
2. Create new Blueprint on Render
3. Connect your repository
4. Add environment variables:
   - `MONGO_URI` - Your MongoDB connection string
5. Deploy!

See full deployment guide in the repo.

## 🗺️ Roadmap

- [ ] Export feedback data to CSV/PDF
- [ ] Custom branding options
- [ ] Multi-language support
- [ ] Email notifications for new feedback
- [ ] Advanced analytics and charts
- [ ] Custom question types (multiple choice, text, etc.)
- [ ] Feedback templates
- [ ] API webhooks

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shriom**
- GitHub: [@shriom17](https://github.com/shriom17)

## 🙏 Acknowledgments

- Icons from emoji characters
- Inspired by anonymous feedback platforms
- Built with modern web technologies

---

<div align="center">

**Made with ❤️ for anonymous feedback**

[Report Bug](https://github.com/shriom17/SilentVoice/issues) · [Request Feature](https://github.com/shriom17/SilentVoice/issues)

</div>