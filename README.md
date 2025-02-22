# YouTube Clone

## Project Overview
This is a YouTube clone built using modern web technologies. It allows users to watch, upload, like, and comment on videos, mimicking the core functionalities of YouTube.

## Features
- User authentication (Login/Register)
- Video upload, playback, and streaming
- Like and dislike videos
- Commenting on videos
- Search functionality
- User profile management
- Responsive UI

## Technologies Used
### Frontend:
- Angular
- Angular Material (for UI components)

### Backend:
- ASP.NET Web API
- Entity Framework Core (for database access)
- Google API (YouTube Data API for fetching video data)

## Installation
### Prerequisites:
- Node.js installed
- .NET SDK installed
- Google API key for YouTube Data API

### Steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/youtube-clone.git
   cd youtube-clone
   ```
2. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
3. Set up environment variables in a `.env` file in the backend directory:
   ```env
   GOOGLE_API_KEY=your_google_api_key
   CONNECTION_STRING=your_database_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```sh
   cd backend
   dotnet run
   ```
5. Start the frontend server:
   ```sh
   cd frontend
   ng serve
   ```
6. Open `http://localhost:4200` in your browser.

## Folder Structure
```
/youtube-clone
│── backend/          # ASP.NET Web API server
│   ├── Models/       # Entity Framework models
│   ├── Controllers/  # API controllers
│   ├── Services/     # Business logic
│   ├── Program.cs    # Entry point
│── frontend/         # Angular client
│   ├── src/
│   │   ├── app/          # Angular components & services
│   │   ├── assets/       # Static assets
│   │   ├── environments/ # Environment configuration
│   │   ├── main.ts       # Bootstrap file
│── .gitignore
│── package.json
│── README.md
```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a user
- `POST /api/auth/login` - Login a user

### Videos
- `POST /api/videos` - Upload a video
- `GET /api/videos` - Fetch all videos
- `GET /api/videos/:id` - Fetch a single video
- `PUT /api/videos/:id` - Update a video
- `DELETE /api/videos/:id` - Delete a video

### Comments
- `POST /api/comments` - Add a comment
- `GET /api/comments/:videoId` - Get all comments for a video

## Contributors
- [Your Name](https://github.com/your-username)

## License
This project is licensed under the MIT License.

